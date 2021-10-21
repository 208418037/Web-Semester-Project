function playAudio(captcha_url_path, audio_string)
{
    var playFiles = "";
    
    for(var i=0; i<audio_string.length; i+=2)
    {
        var str = audio_string.substring(i,i+2);
        str = Number(str);
        
        str = str < 10 ? ("0"+str) : str;			
        
        playFiles = captcha_url_path + "audio/" + str + ".mp3" +  (i == 0 ? "" : ",") + playFiles;
    }
    
    AudioPlayer.embed("soundcaptchaplayer", {  
        soundFile: playFiles,
        buffer: 0,
        autostart: "yes",
        noinfo: "yes",
        titles: "/",
        artists: "/",
        initialvolume: 85
    });
}