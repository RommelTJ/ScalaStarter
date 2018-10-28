package controllers

import javax.inject._
import models.URLModel
import play.api.mvc._
import play.api.libs.json._

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  // private var urlModel: URLModel = _

  private val postUrl = routes.HomeController.getTitleFromURL()

  /**
   * Create an Action to render an HTML page with a welcome message.
   * The configuration in the `routes` file means that this method
   * will be called when the application receives a `GET` request with
   * a path of `/`.
   */
  def index = Action { implicit request =>
    Ok(views.html.index(postUrl))
  }

  def getTitleFromURL = Action { implicit request =>
    val urlModel = URLModel("https://rommelrico.com/", "Rommel Rico Test")

    implicit val urlModelWrites = Json.writes[URLModel]
    val urlModelJson = Json.toJson(urlModel).toString()

    Ok(urlModelJson).as("application/json")
  }

}
