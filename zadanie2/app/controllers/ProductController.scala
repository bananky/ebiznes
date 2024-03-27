package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import models.Product

@Singleton
class ProductController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  
  private var products: List[Product] = List(
    Product(1, "Example Product 1", 99.99),
    Product(2, "Example Product 2", 199.99)
  )
  
  implicit val productFormat: OFormat[Product] = Json.format[Product]

  def listProducts = Action {
    Ok(Json.toJson(products))
  }
  
  def getProduct(id: Long) = Action {
    products.find(_.id == id).map { product =>
      Ok(Json.toJson(product))
    }.getOrElse(NotFound)
  }
  
  def createProduct = Action(parse.json) { request =>
    request.body.validate[Product].map { product =>
      products = products :+ product
      Created(Json.toJson(product))
    }.getOrElse(BadRequest("Invalid JSON"))
  }
  
  def updateProduct(id: Long) = Action(parse.json) { request =>
    request.body.validate[Product].map { product =>
      products = products.map {
        case p if p.id == id => product
        case p => p
      }
      Ok(Json.toJson(product))
    }.getOrElse(BadRequest("Invalid JSON"))
  }
  
  def deleteProduct(id: Long) = Action {
    products = products.filterNot(_.id == id)
    Ok(s"Product with id $id deleted")
  }
}
