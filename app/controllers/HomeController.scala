package controllers

import javax.inject._
import models.URLModel
import play.api.mvc._
import play.api.libs.json._
import java.net.{MalformedURLException, URL}
import java.util.Scanner

import controllers.URLForm.{URLData, form}
import javax.inject.Inject
import models.URLModel
import play.api.data._
import play.api.mvc._

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(cc: MessagesControllerComponents) extends MessagesAbstractController(cc) {

  // private var urlModel: URLModel = _

  private val postUrl = routes.HomeController.getTitleFromURL()

  /**
   * Create an Action to render an HTML page with a welcome message.
   * The configuration in the `routes` file means that this method
   * will be called when the application receives a `GET` request with
   * a path of `/`.
   */
  def index = Action { implicit request: MessagesRequest[AnyContent] =>
    Ok(views.html.index(URLForm.form, postUrl))
  }

  def getTitleFromURL = Action { implicit request: MessagesRequest[AnyContent] =>

    val errorFunction = { formWithErrors: Form[URLData] =>
      // This is the bad case, where the form had validation errors.
      // Let's show the user the form again, with the errors highlighted.
      // Note how we pass the form with errors to the template.
      BadRequest(views.html.index(formWithErrors, postUrl))
    }

    val successFunction = { data: URLData =>
      // This is the good case, where the form was successfully parsed as a Data object.
      // var urlModelJson = ""

      var title = ""
      try {
        val inputStream = new URL(data.url).openStream()
        val scanner = new Scanner(inputStream)
        val responseBody = scanner.useDelimiter("\\A").next()
        title = responseBody.substring(responseBody.indexOf("<title>") + 7, responseBody.indexOf("</title>"))
      } catch {
        // TODO: Do something else in case of exception
        case nse: NoSuchElementException => nse.printStackTrace()
        case mue: MalformedURLException => mue.printStackTrace()
      }

      val urlModel = URLModel(data.url, title)
      implicit val urlModelWrites = Json.writes[URLModel]
      val urlModelJson = Json.toJson(urlModel).toString()
      if (title != "") {
        Ok(urlModelJson).as("application/json")
      } else {
        BadRequest(urlModelJson).as("application/json")
      }
    }

    val formValidationResult = form.bindFromRequest
    formValidationResult.fold(errorFunction, successFunction)
  }

}
