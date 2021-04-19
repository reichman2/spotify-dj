import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import connectRedis from 'connect-redis';
import { buildSchema } from 'type-graphql';
import session, { Cookie } from 'express-session';
import cors from 'cors';
import passport from 'passport';
import PassportSpotify, { VerifyCallback } from 'passport-spotify';
import dotenv from 'dotenv';
import http from 'http';

import scopes from './utils/scopes';
import { redis } from './redis';
import authRoute from './routes/auth';
import { User } from './entities/User';


// Add ability to add more data to session.
declare module 'express-session' {
    export interface SessionData {
        [key: string]: any;
        cookie: Cookie;
    }
}

const SpotifyStrategy = PassportSpotify.Strategy;


const main = async () => {
    dotenv.config();

    await createConnection();

    const schema = await buildSchema({
        resolvers: [__dirname + '/modules/**/*.ts'], // TODO fix this later so it only uses resolvers
        validate: true,
        authChecker: ({ context: { req } }) => {
            return !!req.session.userid;
        }
    });

    const corsOptions = {
        credentials: true,
        origin: "http://localhost:3000" // frontend
    }

    const apolloServer = new ApolloServer({
        schema,
        context: ({ req, res }: any) => ({ req, res })
    });

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    // todo: fix type here...
    passport.deserializeUser((user: any, done) => {
        done(null, user);
    });

    passport.use(new SpotifyStrategy({
        clientID: process.env.SPOTIFY_CLIENT_ID!,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
        callbackURL: "http://localhost:4000/auth/spotify/callback",
        scope: scopes
    }, async (accessToken, refreshToken, _expiresIn, _profile, _done) => {
        // Im sorry for this...
        // Currently there is an issue with passport-spotify and the way 
        // the paramaters in this function are passed.  For now, just lazy 
        // cast these until the issue is fixed.  The issue may also be with
        // the DefinitelyTyped repository.  This can be removed once the
        // issue is fixed.
        // Once again I would like to apologize for this atrocity.
        const profile = _profile as unknown as PassportSpotify.Profile;
        const done = _done as unknown as VerifyCallback;
        const expiresIn = _expiresIn as unknown as number;
        
        let cUser = await User.findOne({ spotifyId: profile.id });
        console.log(`cUser: ${cUser}`);

        if (cUser) {
            cUser.accessToken = accessToken;
            cUser.expiresIn = expiresIn!;
            cUser.save();
        } else {
            const { displayName, id, country, photos, emails, product } = profile;

            console.log(`
            displayName: ${displayName}
            id: ${id}
            country: ${country}
            photos: ${photos}
            emails: ${emails}
            product: ${product}
            `);

            cUser = User.create({
                accessToken,
                refreshToken,
                displayName,
                expiresIn,
                spotifyId: id,
                country,
                isPremium: product === "premium",
                email: emails? emails[0].value : "",
                imageUrl: photos? photos[0] : ""
            });

            cUser.save();
        }

        

        // TODO save userid to session upon successful auth.
        // update: help me how do i do this?? i need req object.
    }));

    const app = express();
    const RedisStore = connectRedis(session);

    app.use(cors(corsOptions));
    app.use(passport.initialize())
    app.use(passport.session());

    app.use(session({
        store: new RedisStore({
            client: redis
        }),
        name: "qid",
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
        }
    }));

    apolloServer.applyMiddleware({ app });
    app.get('/', (req, res) => {
        res.send("poop");
    });

    app.use('/auth', authRoute);

    app.get('/logout', (req, res) => {
        req.session.destroy((err) => console.log(err));
        req.logout();
        res.redirect('/')
    });


    app.listen(4000, () => {
        console.log(`Server started on port 4000\tbuild: ${process.env.NODE_ENV}`);
        // console.log(process.env.SPOTIFY_CLIENT_ID);
        // console.log(process.env.SPOTIFY_CLIENT_SECRET);
    });

}

main();