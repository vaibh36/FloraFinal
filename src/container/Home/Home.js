import React from 'react';
import './Home.css';
import leftImage from '../../assets/leftbar.jpg';
import smallPlants from '../../assets/smallplants.jpg';
import mediumPlants from '../../assets/mediumplants.jpg';
import largePlants from '../../assets/largeplants.jpg';
import part3 from '../../assets/part3.jpg';
import concrete from '../../assets/handpainted.jpg';
import ceramic from '../../assets/handpaintedceremic.jpg';
import logo from '../../assets/logo.jpg';
import {withRouter} from 'react-router-dom';

class Home extends React.Component {


    render() {
        return (
            <div class="home">
           
                <div className="part1">
                    <div style={{ flex: '40%' }} className="leftbar">
                        <img src={leftImage} />
                    </div>
                    <div style={{ flex: '40%' }} className="rightbar">
                        <div style={{ width: '250px', margin: 'auto' }}>
                            <div>
                            <img src={logo} style={{height: '100px', width: '50%'}} />
                            </div>
                            <p>"If I see it in nature, I know it will work in a home"</p>
                            <p>-Miles Redd</p>
                            <p>Lovely fresh plants delivered at your door step..</p>
                            <p>Find your favourite plants and pair it with beautiful pots....</p>
                            <button  onClick={() => this.props.history.push('/allplants/all')}>Shop All Plants</button>
                            <button>Shop All Pots</button>
                        </div>
                    </div>
                    
                </div>
                <div className="part2">
                    <div style={{ position: 'relative' }}>
                        <img className="imgsizing__part2" src={smallPlants} />
                        <button onClick={() => this.props.history.push('/allplants/small')} className="buttonplacement">SMALL PLANTS</button>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <img className="imgsizing__part2" src={mediumPlants} />
                        <button onClick={() => this.props.history.push('/allplants/medium')} className="buttonplacement">MEDIUM PLANTS</button>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <img className="imgsizing__part2" src={largePlants} />
                        <button onClick={() => this.props.history.push('/allplants/large')} className="buttonplacement">LARGE PLANTS</button>
                    </div>
                </div>
                <div className="parth3">
                    <div style={{ position: 'relative' }}>
                        <img className="imgsizing" src={concrete} />
                        <button onClick={() => this.props.history.push('/allplants/concrete')} className="buttonplacement">HANDPAINTED CONCRETE</button>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <img className="imgsizing" src={ceramic} />
                        <button onClick={() => this.props.history.push('/allplants/ceremic')} className="buttonplacement">HANDPAINTED CERMAIC</button>
                    </div>
                </div>
                
                <div className="part4">
                    <div className="footer" style={{paddingTop: '20px', display: 'flex'}}>
                        <div style={{ flex: '33%' }}>
                            <p>Location</p>
                            <div style={{ width: '200px', margin: 'auto' }}>We are based
                            in Faridabad and delivering in Delhi NCR region</div>
                        </div>
                        <div style={{ flex: '33%' }}>
                            <p>CONTACT US</p>
                            <p>fakeemail@gmail.com</p>
                        </div>
                        <div style={{ flex: '34%' }}>
                            <p>Help</p>
                            <p>Shipping</p>
                            <p>Privacy Policy</p>
                            <p>FAQ</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

export default withRouter(Home);