package com.example

import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import com.example.plugins.sendMessageModule
import dev.kord.core.Kord

suspend fun main() {
    val kord = Kord() // token bota usunięty do publikacji na githuba

    embeddedServer(Netty, port = 8080, host = "0.0.0.0") {
        module(kord)
    }.start(wait = true)

    kord.login()
}

fun Application.module(kord: Kord) {
    sendMessageModule(kord)
}



