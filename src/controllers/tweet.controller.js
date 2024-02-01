import mongoose, { isValidObjectId } from "mongoose"
import { Tweet } from "../models/tweet.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet

    // Get userId from cookies
    // Get content from body
    // Check for a valid content
    // Create a tweet document with userId and content
    // Return a response with created tweet document
    const userId = req.user._id
    const { content } = req.body

    if (!content) {
        throw new ApiError(400, "Please provide a content")
    }

    const tweet = await Tweet.create({
        content,
        owner: userId
    })

    if (!tweet) {
        throw new ApiError(500, "Something went wrong while creating tweet")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                tweet,
                "Tweet created successfully"
            )
        )
})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets

    // Get userId from cookies
    // Find documents which has same userId 
    // Return an array of tweet documents as a response 

    const { userId } = req.params

    if (!userId.trim()) {
        throw new ApiError(404, "UserId is missing")
    }

    const tweets = await Tweet.find({ owner: userId })

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                tweets,
                "Tweets fetched successfully"
            )
        )
})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet

    // Get tweetId from params
    // Get content to be updated from body
    // search tweet from tweets collection
    // If not found return error
    // update the content in the tweet and return updated tweet as response
    const { tweetId } = req.params
    const { content } = req.body

    if (!content.trim()) {
        throw new ApiError(400, 'Invalid content')
    }

    const tweet = await Tweet.findByIdAndUpdate(
        tweetId, {
        $set: {
            content: content.trim()
        }
    }, { new: true }
    )

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                tweet,
                "Tweet updated successfully"
            )
        )
})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet

    // Get tweetId from params
    // Find tweet in tweets collection
    // Delete tweet and return success

    const { tweetId } = req.params

    await Tweet.findByIdAndDelete(tweetId)

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Tweet deleted successfully"
            )
        )

})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}
