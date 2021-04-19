import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

import { MyContext } from "src/types/MyContext";


@Resolver()
export class SkipResolver {
    // TODO maybe use enum for playback state?

    @Mutation(() => String)
    async next(@Arg('roomid') roomid: String) {
        // TODO requst or change to play given room settings
        // TODO return the current playback state

        return "";
    }

    @Mutation(() => String)
    async prev(@Arg('roomid') roomid: String) {
        // TODO request or change to pause given room settings
        // TODO return the current playback state.

        return "";
    }
}