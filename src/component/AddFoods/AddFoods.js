import React from 'react'
import imgFoods from '../../img/steak.jpg'
import '../AddFoods/AddFoods.css'

export const AddFoods = () => {
  return (
    <>
    <div className='gallery'>
    <section id='gallery'>     
      <div className='box-foods'>
        <div className='box'>
          <img src={imgFoods} alt=""/>
          <div className='content'>
            <h3>Taste Food</h3>
            <p>lorem dvv qwwqfqw feege qqqw qwfqwf</p>
            <button href='#' className='btn-detail'>Detail</button>
          </div>
        </div>
      </div>
    </section>

    </div>
    </>
  )
}
