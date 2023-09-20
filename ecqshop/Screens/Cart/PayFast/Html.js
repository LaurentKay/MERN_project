let Html = `
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
        <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
            <style type="text/css">
                body
                {
                    width: 100%;
                    height: 100%;
                    background-color: white;
                }
                .card{
                    width: 90%;
                    border-radius: 25px;
                    text-align: center;
                    margin: auto;
                    height: 50%;
                    position: relative;
                    top: 50%;
                    transform: translateY(-50%);
                    box-shadow: 0px 0px 35px #ccc;
                }

                .center{
                    margin: auto;
                    position: relative;
                    top: 0; left: 0; bottom: 0; right: 0;
                }

                .header{
                    background-color: #dc3545;
                    border-radius: 25px 25px 0px 0px;
                    padding: 20px
                }

                h1{
                    font-size: 50px
                }

                p{
                    font-size: 42px
                }

                .btn{
                    width: 35%;
                    font-size: 50px;
                    padding: 20;
                    border-radius: 60px
                }

                .outer {
                    display: table;
                    position: relative;
                    top: 0;
                    left: 0;
                    height: 80%;
                    width: 100%;
                }

                .middle {
                    display: table-cell;
                    vertical-align: middle;
                }

                .inner {
                    margin: auto
                }

            </style>
        </head>
        <body>
            <div class="card">
                <div class="header ">
                    <h1 style="color: white">Almost there!</h1>
                </div>
                <div class="card-body">
                    <div class="outer">
                        <div class="middle" >
                            <div class="inner" >`


    export default Html;