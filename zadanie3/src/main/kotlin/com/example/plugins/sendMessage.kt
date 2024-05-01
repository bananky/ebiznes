package com.example.plugins

import dev.kord.common.entity.Snowflake
import dev.kord.core.Kord
import dev.kord.core.entity.channel.TextChannel
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json


fun Application.sendMessageModule(kord: Kord) {
    routing {
        post("/send") {
            val request = call.receive<String>()
            val (message, channel) = Json.decodeFromString<receiveMessage>(request)
            kord.getChannelOf<TextChannel>(Snowflake(channel))?.createMessage(message)
            call.respond("Message sent")
        }
    }
}

@Serializable
data class receiveMessage(val message: String, val channel: String)