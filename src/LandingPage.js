import React from 'react'
import Navbar from './components/Navbar'
import { useNavigate } from "react-router-dom";
import './LandingPage.css'

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
        <Navbar></Navbar>
        <div className='landing-page-container'>
            <div className="text-content">
                <h1 className='welcome-text'>Welcome to Recipify</h1>
                <p className='website-intro'>Have you ever had a bunch of ingredients within your pantry but never know what to cook with it? Well look no further! Recipify looks to streamline this process by providing an 'ingredient search engine' to help you find your next tasty meal to cook!</p>
                <p className='website-intro'>Get started by either searching an ingredient through the search bar or using the selection of a few common household ingredients that you may have in stock if you'd prefer to utilize buttons. Feel free to add as many or as little ingredients as you please!</p>
                <button className='start-button' onClick={() => navigate('/lookup')}>Get Started</button>
                <h2 className='power-spoonacular'>Powered by Spoonacular</h2>
            </div>
            <div className="image-container">
                <img src='../assets/landingpage.png' alt="A man and a woman are happily cooking together."></img>
            </div>
        </div>
    </>
  )
}

export default LandingPage