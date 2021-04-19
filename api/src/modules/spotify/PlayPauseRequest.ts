import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

import { MyContext } from "src/types/MyContext";
import { redis } from "../../redis";


@Resolver()
export class PlayPauseResolver {
    // TODO maybe use enum for playback state?

    @Mutation(() => String)
    async play(@Arg('roomid') roomid: String, @Ctx() ctx: MyContext) {
        // TODO requst or change to play given room settings
        // TODO return the current playback state?

        return "";
    }

    @Mutation(() => String)
    async pause(@Arg('roomid') roomid: String, @Ctx() ctx: MyContext) {
        // TODO request or change to pause given room settings

        return "";
    }

    @Mutation(() => String)
    async toggle(@Arg('roomid') roomid: String, @Ctx() ctx: MyContext) {
        // TODO request play/pause toggle given room settings

        return "";
    }

    @Query(() => String, { nullable: true })
    async status(@Arg('roomid') roomid: String, @Ctx() ctx: MyContext) {
        // TODO return the status of the room
        
        return "";
    }
}