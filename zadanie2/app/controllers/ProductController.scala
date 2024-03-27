package controllers

import javax.inject._
import play.api.mvc._
import models.Product

@Singleton
class ProductController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {
  
  def index = Action {
    Ok("Product controller is ready!")
  }
  
}
