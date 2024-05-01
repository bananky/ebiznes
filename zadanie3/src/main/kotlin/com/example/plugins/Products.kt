package com.example.plugins

import kotlinx.serialization.Serializable

@Serializable
data class Product(
    val id: Int,
    val name: String,
    val category: Int
)

var products: List<Product> = listOf(
    Product(1, "To", 1),
    Product(2, "Carrie",  1)
)

fun getProducts(category: Int): String {
    val matchingProducts = products.filter { it.category == category }
    return matchingProducts.joinToString(separator = "\n") { it.name}
}