import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import { WebView } from "react-native-webview";
var md5 = require('md5');
import BodyCode from "./Html"


// Style sheet
const styles = StyleSheet.create({
    webViewWrapper: {
        width: "100%",
        flex: 1
    },
    pfWrapper: {
        width: "100%",
        flex: 1
    },
    pfButton: {
        height: 40,
        width: "100%"
    }
});

const PayFastWebView = props => {
    // State constants
    const [html, setHtml] = useState("");
    const uri = props.sandbox ? "https://sandbox.payfast.co.za/eng/process" : "https://www.payfast.co.za/eng/process";

    let datas = {};

    // Adding returns url to the data
    for (const key in props.data) {
        datas[key] = props.data[key];
        if (key === "merchant_key") {
            datas.return_url = 'https://ecquatorial.com/mobileComplete.html';
            datas.cancel_url = 'https://ecquatorial.com/mobileError.html';
        }
    }


    // Functions
    const setWebViewHandler = (data) => {

        // Check if signature is required
        if (props.signature) {

            // Generating the signature
            let getString = "";
            for (const key in data) {
                getString += key + "=" + encodeURIComponent(data[key])
                    .replace(/!/g, '%21')
                    .replace(/'/g, '%27')
                    .replace(/\(/g, '%28')
                    .replace(/\)/g, '%29')
                    .replace(/\*/g, '%2A')
                    .replace(/~/g, '%7E')
                    .replace(/%20/g, '+') + '&';
            }

            //Deleting the last ampersand
            let newString = getString.slice(0, getString.length - 1)

            let signatureString = newString;

            if (props.passphrase !== null && props.passphrase !== undefined) {
                signatureString = newString + "&passphrase=" + props.passphrase;
            }
            const signature = md5(signatureString);
            getString += "signature=" + signature;

            datas = { ...data, signature: signature }
        }

        ////////////////////////////////////////////Generating html form\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        let code = (`${BodyCode}
                <h1>You are about to make a payment.</h1><br />
                <h1>Order Name: ${datas.item_name}</h1><br />
                <h1>Amount: R${datas.amount}</h1><br /><br /><br /><br />
                <form action="${uri}" method="post">`);
        for (const name in datas) {
            code += `<input name="${name}" type="hidden" value="${datas[name]}" />`
        }
        code += `<input class="btn btn-danger"  type="submit" value="Pay Now" /></form></div></div></div></div></div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        </body></html>`
        setHtml(code)
        ////////////////////////////////////////////Generating html form\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    };

    useEffect(() => {
        setWebViewHandler(datas)
    }, [])

    // Render the component
    return (
        <View style={styles.pfWrapper}>
            <View style={styles.webViewWrapper}>
                <WebView
                    style={styles.webViewWrapper}
                    originWhitelist={['*']}
                    source={{ html: html }}
                    onMessage={(event) => {
                        let value = event.nativeEvent.data === "Success" ? true : false
                        props.callback(value)
                        props.onClick && props.onClick();
                    }}
                />
            </View>
        </View>
    );
}

export default PayFastWebView;