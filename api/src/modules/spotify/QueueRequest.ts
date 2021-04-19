import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

import { MyContext } from "src/types/MyContext";


@Resolver()
export class QueueResolver {
    // TODO maybe use enum for playback state?

    @Mutation(() => String)
    async addSong(@Arg('songId') songId: String, @Arg('pos') pos?: Number) {
        // Add to the bottom of the queue if no position

        // TODO return the new queue
        return "TODO";
    }

    @Mutation(() => String)
    async removeSong(@Arg('pos') pos: Number) {
        // TODO return the new queue 
        return "TODO";
    }

    @Mutation(() => String) 
    async moveSong(@Arg('from') from: Number, @Arg('to') to: Number) {
        // Move song at "from" to "to"

        // TODO return the new queue
        return "TODO";
    }

    @Query(() => String)
    async check() {
        // TODO return the queue
        return "TODO";
    }
}