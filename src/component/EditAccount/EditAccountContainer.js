import React, { Component } from 'react';
import EditAccount from './EditAccount';
import axios from 'axios';
import {fetchProfileInfo, updateProfile, fetchUserData} from '../../redux/reducer';
import {connect} from 'react-redux';

class EditAccountContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            image: '',
            description:'',
            website:'',
            email: '',
            instagram: '',
            fullInstagram: '',
            facebook:'',
            fullFacebook:'',
            astrobin: '',
            fullAstrobin: ''
        }
        this.getImage = this.getImage.bind(this);
        this.submitUpdate = this.submitUpdate.bind(this);
        this.cancel = this.cancel.bind(this);
        this.updateDescription = this.updateDescription.bind(this);
        this.updateWebsite = this.updateWebsite.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.updateInstagram = this.updateInstagram.bind(this);
        this.updateFacebook = this.updateFacebook.bind(this);
        this.updateAstrobin = this.updateAstrobin.bind(this);
    }

    componentDidMount(){
        const user = this.props.user;
        const profile = this.props.profile;
        let instagram = '';
        let facebook = '';
        let astrobin = '';
        if(this.props.profile.facebook){
            facebook = this.props.profile.facebook.split('/').pop();
        }
        if(this.props.profile.instagram){

            instagram = this.props.profile.instagram.split('/').pop()
        }
        if(this.props.profile.astrobin){

            astrobin = this.props.profile.astrobin.split('/').pop()
        }
        this.setState({
            image: profile.profile_image,
            description: profile.description,
            website: profile.website,
            email: user.email,
            instagram: instagram,
            facebook:facebook,
            astrobin: astrobin,
            fullFacebook: profile.facebook,
            fullInstagram: profile.instagram,
            fullAstrobin: profile.astrobin
           
        })
    }

    updateDescription(description){
        this.setState({
            description: description
        })
    }

    updateWebsite(website){
        this.setState({
            website: website
        })
    }

    updateEmail(email){
        this.setState({
            email: email
        })
    }

    updateInstagram(instagram){
        const fullInstagram = `https://www.instagram.com/${instagram}`

        if(!instagram){
            this.setState({
                fullInstagram: null,
                instagram: ''
            })
        }else{
            this.setState({
                instagram: instagram,
                fullInstagram: fullInstagram
            })
        }

        
    }

    updateFacebook(facebook){
        const fullFacebook = `https://www.facebook.com/${facebook}`
        if(!facebook){
            this.setState({
                fullFacebook: null,
                facebook:''
            })
        }else {
            this.setState({
                facebook: facebook,
                fullFacebook: fullFacebook
            })
        }
           
    }

    updateAstrobin(astrobin){
        const fullAstrobin = `https://www.astrobin.com/users/${astrobin}`
        if(!astrobin){
            this.setState({
                fullAstrobin: null,
                astrobin:''
            })
        }else {
            this.setState({
                astrobin: astrobin,
                fullAstrobin: fullAstrobin
            })
        }
           
    }

    getImage(image){
        this.setState({
            image: image
        })
        
    }

    

    submitUpdate(){

         axios.put('/api/update_user_data', {email: this.state.email}).then(user => {
            this.props.fetchUserData(user.data);
         })
        

        axios.put('/api/update_profile_data', {
            image: this.state.image, 
            description: this.state.description, 
            website: this.state.website, 
            facebook: this.state.fullFacebook,
            instagram: this.state.fullInstagram,
            astrobin: this.state.fullAstrobin
        }).then(response => {
            
            this.props.fetchProfileInfo(response.data[0])
            this.props.history.goBack()
        })
    }

    cancel(){
        this.props.history.goBack()
    }
    
    render() {
        
        return (
            <div>
                <EditAccount 
                    user={this.props.user}
                    profile={this.props.profile}
                    description={this.state.description}
                    website={this.state.website}
                    getImage={this.getImage}
                    image={this.state.image}
                    submitUpdate={this.submitUpdate}
                    cancel={this.cancel}
                    updateWebsite={this.updateWebsite}
                    updateDescription={this.updateDescription}
                    email={this.state.email}
                    updateEmail={this.updateEmail}
                    facebook={this.state.facebook}
                    instagram={this.state.instagram}
                    astrobin={this.state.astrobin}
                    updateFacebook={this.updateFacebook}
                    updateInstagram={this.updateInstagram}
                    updateAstrobin={this.updateAstrobin}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        profile: state.profileInfo
    }
}

const mapDispatchToProps = {

    fetchProfileInfo: fetchProfileInfo,
    fetchUserData: fetchUserData
}


export default connect(mapStateToProps, mapDispatchToProps)(EditAccountContainer)
