from dataclasses import dataclass
from typing import List

@dataclass
class Category:
    id: int
    name: str

categories: List[Category] = [
    Category(1, "Horror"),
    Category(2, "Dramat"),
    Category(3, "Romans")
]

@dataclass
class Product:
    id: int
    name: str
    category: int

products: List[Product] = [
    Product(1, "To", 1),
    Product(2, "Carrie", 1)
]
