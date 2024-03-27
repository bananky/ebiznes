name := "Zadanie2"

version := "1.0"

scalaVersion := "2.12.18" 

lazy val root = (project in file(".")).enablePlugins(PlayScala)

libraryDependencies += guice
// libraryDependencies += "com.typesafe.play" %% "play-slick" % "5.0.0" 
// libraryDependencies += "com.typesafe.play" %% "play-slick-evolutions" % "5.0.0" 
// libraryDependencies += "com.typesafe.play" %% "play-json" % "2.9.2"
libraryDependencies += "org.scala-lang.modules" %% "scala-xml" % "2.1.0"
