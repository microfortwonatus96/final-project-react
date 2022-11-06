import React from 'react'
import '../Footer/footer.css'

const Footer = () => {
    return (
        <footer>
                <div className="container inner-footer">
                    <div className='d-flex'>
                    <div className="col-4">
                        <h2>About Us</h2>
                        <div className="text-about-us">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore possimus labore dignissimos quia qui ad eum, laudantium cum dolores dolorem ipsam placeat voluptate atque culpa nostrum exercitationem dicta quo a!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore possimus labore dignissimos quia qui ad eum, laudantium cum dolores dolorem ipsam placeat voluptate atque culpa nostrum exercitationem dicta quo a!
                        Lorem ipsum dolor. Inventore possimus labore dignissimos quia qui ad eum, laudantium cum dolores dolorem ipsam placeat voluptate atque culpa nostrum exercitationem dicta quo a!
                        </div>
                    </div>
                    <div className="col-4">
                        <h2>Menu</h2>
                        <div className='d-block'>
                            <button className="button-footer">Home</button>
                            <button className="button-footer">About Us</button>
                            <button className="button-footer">My Favorite</button>
                            <button className="button-footer">Add foods</button>
                        </div>
                    </div>
                    <div className="col-4">
                        <h2>Contact Us</h2>
                        <div className='d-flex align-items-center gap-3 pointer'>
                            <i class="bi bi-envelope"></i>
                            <p className='text-email'>loremipsum@gmail.com</p>
                        </div>
                        <div className='d-flex align-items-center gap-3 pointer'>
                            <i class="bi bi-facebook"></i>
                            <p className='text-email'>loremipsumloremipsum</p>
                        </div>
                        <div className='d-flex align-items-center gap-3 pointer'>
                            <i class="bi bi-twitter"></i>
                            <p className='text-email'>@loremipsumloremipsum9999</p>
                        </div>
                        <div className='d-flex align-items-center gap-3 pointer'>
                            <i class="bi bi-instagram"></i>
                            <p className='text-email'>loremipsumloremipsum__loremipsum</p>
                        </div>
                        <div className='d-flex align-items-center gap-3 pointer'>
                            <i class="bi bi-tiktok"></i>
                            <p className='text-email'>lorem_ipsumloremipsum99</p>
                        </div>
                    </div> 
                    </div>        
                </div>
                <p className="copyright">
                    Copyright &copy;2022 Micro Fortwonatus | All Rights are reserved.
                </p>
        </footer>
        )
}

export default Footer