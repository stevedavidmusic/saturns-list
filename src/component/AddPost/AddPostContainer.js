import React, { Component } from 'react';
import Header from '../shared/Header';
import axios from 'axios';
import AddPost from './AddPost';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import Footer from '../shared/Footer';
import { fetchUserData } from '../../redux/reducer';
import Categories from '../ItemList/Categories';


class AddPostToContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            headerStyle: 'orange',
            category: '',
            itemName: '',
            itemDescription:'',
            itemPrice: '',
            itemCondition:'',
            images:[],
            upload: 'item',
            text: '',
            message:'',
            error: '',
            
        }
        this.getCategory = this.getCategory.bind(this);
        this.getItemDescription = this.getItemDescription.bind(this);
        this.getItemName = this.getItemName.bind(this);
        this.getItemPrice = this.getItemPrice.bind(this);
        this.getItemCondition = this.getItemCondition.bind(this);
        this.post = this.post.bind(this);
        this.getImage = this.getImage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.resendLink = this.resendLink.bind(this);
        
        
    }

    componentDidMount(){
        axios.get('/api/user-data').then(user => {
            this.props.fetchUserData(user.data);
        })
    }

    

    handleChange(value) {
        this.setState({ text: value })
    }
 

    getCategory(category){
        this.setState({
            category: category
        })
    }

    getItemName(itemName){
        this.setState({
            itemName: itemName
        })
    }

    getItemDescription(description){
        this.setState({
            itemDescription: description
        })
    }

    getItemPrice(price){
        this.setState({
            itemPrice: price
        })
    }

    getItemCondition(condition){
        this.setState({
            itemCondition: condition
        })
    }

    getImage(image){
        this.setState({
            images: [...this.state.images].concat(image)
        })
    }

    resendLink(){
        axios.get('/api/resend_email').then(response => {
            console.log()
            this.setState({
                message: response.data
            })
        })
    }

    post(){
        let imageArray;
        if(this.state.images.length){
            imageArray = this.state.images;
        }else{
            imageArray = ['https://res.cloudinary.com/saturnslist/image/upload/v1520883790/tarae1i8srjcnx7fvgbw.png']
        }
        if(this.state.category == ''){
            this.setState({
                error: 'You Must Select a Catergory'
            });
        }else if(this.state.itemPrice == ''){
            this.setState({
                error: 'You Must Set a Price'
            });

        }else if(this.state.itemCondition == ''){
            this.setState({
                error: 'You Must Select a Condition'
            });
        }else if(this.state.itemName == ''){

            this.setState({
                error: 'You Must Set an Item Name'
            });

        }else if(this.state.text == ''){
            this.setState({
                error: 'You Must Set an Item Description'
            });

        }else {

            const price = parseInt(this.state.itemPrice)
        axios.post('/api/new_item', {cat_id: this.state.category, price: price, name:this.state.itemName, condition:this.state.itemCondition, description: this.state.text, imageArray: imageArray}).then(response => {
            
            this.setState({
                message: 'Thank you for your submission, Your post is pending approval and will be reviewed shortly you will be redirected to the home page in a few seconds',
                error: ''
            })
            setTimeout(function() {
                window.location.href = response.request.responseURL;
              }, 4000);
           
        })
        }
    }
    
    render() {
        return (
            <div className='add-post-container'>
                <Header color1={this.state.headerStyle}/>
                {this.props.user == false ? 
                <h1>You Must <Link to='/account_login'>Login</Link> or <Link to='/account_login'>Register</Link> for an account</h1> : this.props.user.verified ?
                <div> 
                <AddPost
                    getCategory={this.getCategory}
                    getItemName={this.getItemName}
                    getItemDescription={this.getItemDescription}
                    getItemPrice={this.getItemPrice}
                    getItemCondition={this.getItemCondition}
                    post={this.post}
                    category={this.state.category}
                    itemName={this.state.itemName}
                    itemDescription={this.state.itemDescription}
                    itemPrice={this.state.itemPrice}
                    itemCondition={this.state.itemCondition}
                    categories={this.props.categories}
                    images={this.state.images}
                    getImage={this.getImage}
                    upload={this.state.upload}
                    handleChange={this.handleChange}
                    text={this.state.text}
                    message={this.state.message}
                    error={this.state.error}
                /> 
                <Footer/>
                </div>
                : <div className='resend-container'>
                    <h1>You Must verify your email address before posting</h1>
                    <button onClick={()=>this.resendLink()} className='resend-email-link'>Resend veification link</button>
                    <span className='resend-message'>{this.state.message}</span>
                    </div>
                }
                {/* <AddPost/> */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        categories: state.categories
    }
}

const mapDispatchToProps = {
    fetchUserData: fetchUserData
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPostToContainer)