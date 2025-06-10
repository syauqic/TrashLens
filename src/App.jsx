import React from 'react'
import Navbar from './components/Navbar'
import Side from './components/Side'
import Hero from './components/Hero'
import About from './components/About'
import Footer from './components/Footer'

export default function app() {
  return (
    <>
    <Navbar/>
    <Side/>
    <Hero/>
    <About/>
    <Footer/>
    </>
  )
}
