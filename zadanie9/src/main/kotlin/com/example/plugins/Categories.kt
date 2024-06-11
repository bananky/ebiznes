package com.example.plugins

import kotlinx.serialization.Serializable

@Serializable
data class Category(val id: Int, val name: String)

val categories: List<Category> = listOf(
    Category(1, "Horror"),
    Category(2, "Dramat"),
    Category(3, "Romans")
)

fun getCategories(): String {
    return categories.joinToString(separator = "\n") { it.name }
}

@Serializable
data class CategoryRequest(val category: String)