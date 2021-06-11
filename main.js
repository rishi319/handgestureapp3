Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
    });
    camera=document.getElementById("camera");
    Webcam.attach('#camera');
    function takePhoto()
    {
        Webcam.snap(function(data_uri)
            {
                document.getElementById("result").innerHTML='<img id="capture"src="'+data_uri+'"/>';
            }
            );
    }
    console.log("ml5 version: "+ml5.version);
    classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/KfMUFdmzm/model.json',modelLoaded);
    function modelLoaded()
    {
        console.log("model has loaded");
    }
    function check()
    {
        img=document.getElementById("capture");
        classifier.classify(img,gotResult);
    }
    function gotResult(error,results)
    {
        if(error)
        {
            console.error(error);
        }else{
            console.log(results);
    document.getElementById("emotion_name").innerHTML=results[0].label;
    document.getElementById("emotion_name2").innerHTML=reults[1].label;
    prediction1=results[0].label;
    prediction2=results[1].label;
    speak();
    if(results[0].label=="Crossed fingers"){
    document.getElementById("emoji").innerHTML="&#129310;";
    }
    if(results[0].label=="Best"){
    document.getElementById("emoji").innerHTML="&#128076;";
    }
    if(results[0].label=="Victory"){
        document.getElementById("emoji").innerHTML="&#9996;";
        }
    if(results[1].label=="Crossed fingers"){
     document.getElementById("emoji2").innerHTML="&#129310;";
    }
     if(results[1].label=="Best"){
     document.getElementById("emoji2").innerHTML="&#128076;";
    }
    if(results[1].label=="Victory"){
    document.getElementById("emoji2").innerHTML="&#9996;";
     }
        }
    }
    function speak()
    {
        var synth=window.speechSynthesis;
        speakData1="The first prediction is "+ prediction1;
        speakData2="The second prediction is"+ prediction2;
        var utterThis= new SpeechSynthesisUtterance(speakData1+speakData2);
       utterThis.rate=1.0;
        synth.speak(utterThis);
    }
    