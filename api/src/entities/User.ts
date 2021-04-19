import { Field, ID, ObjectType, Root } from 'type-graphql';
import { v4 } from 'uuid';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity
} from 'typeorm';


@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column("text", { unique: true })
    spotifyId: string;

    @Field()
    @Column("text")
    displayName: string;

    @Field()
    @Column("text", { unique: true, nullable: true })
    email: string;
    
    @Field()
    @Column("text", { nullable: true })
    imageUrl: string;

    @Field()
    @Column("text", { nullable: true })
    country: string;

    @Field()
    @CreateDateColumn()
    dateCreated: Date;

    @Field()
    @UpdateDateColumn()
    dateUpdated: Date;

    @Field()
    @Column("bool")
    isPremium: boolean;


    @Field()
    @Column("text")
    accessToken: string;

    @Field()
    @Column("text")
    refreshToken: string;

    @Field()
    @Column("int")
    expiresIn: number;
}