import React, { Component } from 'react';
import { 
    View, 
    Modal, 
    StyleSheet, 
    Dimensions, 
    TouchableWithoutFeedback 
} from 'react-native';

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        const { height, width } = Dimensions.get('window');
        this.height = height;
        this.width = width;
    }

    render() {
        const modalHeight = this.props.bottomHalf? this.height / 2: this.height;
        const mWidth = this.width;
        const styles = StyleSheetFactory.getSheet({
            boxBgColor: this.props.boxBackgroundColor,
            fullscreen: this.props.fullscreen,
            modalHeight: modalHeight,
            bottomHalf: this.props.bottomHalf,
            modalWidth: mWidth,
        });
        return (
            <Modal 
                animationType={this.props.animation}
                transparent={this.props.transparentContainer}
                visible={this.props.visible}
                presentationStyle={this.props.mode}
                style={{}}
            >
                <TouchableWithoutFeedback
                    onPress={() => this.props.outsideClick()}
                >
                    <View style={styles.mainContainer}>
                        <View style={styles.modalWrapper}>
                            <View style={styles.modalContainer}>
                                {this.props.children}
                            </View>
                        </View> 
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}

class StyleSheetFactory {
    static getSheet({
        boxBgColor, 
        fullscreen,
        bottomHalf,
        modalHeight,
        modalWidth,
    }) {
        const styles = StyleSheet.create({
            mainContainer: { flex: 1},
            modalWrapper: {
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent',
                height: modalHeight,
                width:modalWidth,
                top:0,
                //marginTop:0,
               // borderWidth:4
                //top:-200
                //marginTop:-400
            },
            modalContainer: {  
                backgroundColor: boxBgColor,
                borderWidth: 1,
                width:modalWidth,
                height:modalHeight,
                borderColor: 'lightgray',
                borderStyle: 'solid',
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 1,
                marginTop:0
            }
        });

        if(fullscreen) {
            styles.modalWrapper = {
                ...styles.modalWrapper,
                flex: 1
            };

            styles.modalContainer = {
                ...styles.modalContainer,
                flex: 1
            };
        }
        else if(bottomHalf) {
            styles.modalWrapper = {
                ...styles.modalWrapper,
                marginTop: modalHeight
            };

            styles.modalContainer = {
                ...styles.modalContainer,
                flex: 1
            };
        }
        else { 
            styles.modalWrapper = {
                ...styles.modalWrapper,
                flex: 1
            };

            styles.modalContainer = {
                ...styles.modalContainer,
                marginHorizontal: 10
            }
        }

        return styles;
    }
}