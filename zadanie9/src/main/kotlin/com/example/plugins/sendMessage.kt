package com.example.plugins

import dev.kord.common.entity.Snowflake
import dev.kord.core.Kord
import dev.kord.core.entity.channel.TextChannel
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.encodeToString



fun Application.sendMessageModule(kord: Kord) {
    routing {
        post("/send") {
            val request = call.receive<String>()
            val (message, channel) = Json.decodeFromString<receiveMessage>(request)
            kord.getChannelOf<TextChannel>(Snowflake(channel))?.createMessage(message)
            call.respond("Message sent")
        }
        get("/categories") {
            val categoriesJson = Json.encodeToString(categories)
            call.respondText(categoriesJson, ContentType.Application.Json)
        }
        get("/products") {
            val request = call.receive<String>()
            val (category) = Json.decodeFromString<CategoryRequest>(request)
            val categoryId = categories.find { it.name.equals(category, ignoreCase = true) }?.id
            val productsJson = Json.encodeToString(products.filter { it.category == categoryId })
            call.respondText(productsJson, ContentType.Application.Json)
        }

        post("/slack/events") {
            val params = call.receiveParameters()
            val command = params["command"]
            val text = params["text"]

            val response = when (command) {
                "/categories" -> getCategories()
                "/products" -> {
                    val categoryId = categories.find { it.name.equals(text, ignoreCase = true) }?.id
                    if (categoryId != null) {
                        getProducts(categoryId)
                    } else {
                        ""
                    }
                }

                else -> {""}
            }
            call.respondText(response)
        }

    }
}

@Serializable
data class receiveMessage(val message: String, val channel: String)