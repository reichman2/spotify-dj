import { Ctx, Query } from "type-graphql";

import { MyContext } from "src/types/MyContext";
import { User } from '../../entities/User';

export default class MeResolver {
    @Query(() => User, { nullable: true, complexity: 5 })
    async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
        if (!ctx.req.session!.userId) {
            return undefined;
        }

        return User.findOne(ctx.req.session!.userId);
    }
}