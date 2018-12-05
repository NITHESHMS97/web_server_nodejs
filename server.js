const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
const port=process.env.PORT || 3000;
var app=express();


hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

app.use((req,res,next)=>{
  var now =new Date().toString();
  var log=now+":"+req.method+req.url;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=>
  {
      if(err)
      {
        console.log("unable to append to serverlog");
      }
  });

  next()// tells when middleware function is done

});
/*
app.use((req,res,next)=>
{
    res.render('maintance.hbs')

});
*/
app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrerntYear',()=>
{
  return new Date().getFullYear()
})
hbs.registerHelper('screenIt',(text)=>
{
  return text.toUpperCase();
})
app.get('/',(req,res)=>
{
//  res.send("<h1>hello express!</h1>");
  res.render('home.hbs',
    {
      pageTitle:"HOME PAGE",
      welcomeMessage:"Welcome to New World"
    }
  );
});

app.get('/about',(req,res)=>
{
  res.render('about.hbs',
  {
      pageTitle:'About Page',

  }
  );
})

app.get('/projects',(req,res)=>
{
  res.render('projects.hbs')
  {
    pageTitle:'Project'
  }
})
app.get('/bad',(req,res)=>
{
  res.send({
    errorMessage:"bad error"
  });
})
app.listen(port,()=>
{
  console.log("server is up and running in port ",port);
});
