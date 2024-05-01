package com.example

import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import com.example.plugins.sendMessageModule
import dev.kord.core.Kord
import dev.kord.core.event.message.MessageCreateEvent
import dev.kord.core.on
import dev.kord.gateway.Intent
import dev.kord.gateway.PrivilegedIntent
import com.example.plugins.getCategories

suspend fun main() {
    val kord = Kord() // token bota usunięty do publikacji na githuba

    kord.on<MessageCreateEvent> {
        if (message.author?.isBot != false) return@on
        if (message.content != "!categories") return@on
        message.channel.createMessage(getCategories())
    }

    embeddedServer(Netty, port = 3000, host = "0.0.0.0") {
        module(kord)
    }.start(wait = false)

    kord.login {
        @OptIn(PrivilegedIntent::class)
        intents += Intent.MessageContent
    }
}

fun Application.module(kord: Kord) {
    sendMessageModule(kord)
}


