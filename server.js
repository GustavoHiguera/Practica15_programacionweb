//inicializamos npm, instalamos el paquete de express, el paquete ejs y
//el paquete nodemon desde la línea de comandos, ahora copiamos el contenido
//de la anterior practica.

const express= require('express'); //Se inyecta la dependencia
let app= express();
let PORT = process.env.port || 3000; //Se define el puerto de escucha
app.use('/assets', express.static(__dirname + '/public')); //El contenido estático

app.use(express.urlencoded({ extended: false}));
//Con esta línea especificamos que vamos a parsear peticiones con urlencoded (datos dentro del body)

app.set('view engine', 'ejs');
//Con esta línea nuestra app de express utiliza EJS como un motor de vistas.
//Para usarlo debemos crear un directorio llamado 'views' en el que las vistas
//tengan la extensión '.ejs' en lugar de 'html'.


app.get('/', (req, res) =>{
    res.send(`<!DOCTYPE html> <html lang "en"> <head><link rel="stylesheet" href="/assets/style.css">
    <title>Document</title> </head>
    <body> <h1>Hola mundo </h1>
    <p> Este es un parrafo y su contenido debe ser azul</p></body></html>`)
});

app.get('/person/:id', (req, res)=>{
    res.render('person', {ID: req.params.id, Msg: req.query.msg, Times: req.query.times});
});
//Ahora usaremos render en lugar de send para que lo renderice el motor de vistas
//además le pasaremos 2 parametros, la vista que va a renderizarse y los parámetros que recibe,
//los cuales en este caso son 2, al ID le pasamos el valor de la ruta '/person/:id', y
//el de la query string express lo parsea mediante 'req.query'

//Es importante mencionar que en el archivo ejs, los nombres ID y Qstr deben ser exactamente
//iguales.
//Ahora recibe los parámetros Msg y Times, además del id

app.get('/student', (req, res) => {
    res.render('index');
})
//Con esta petición get, podemos renderizar la vista index, la cual contendrá el formulario, dicho
//formulario será enviado al momento de presionar el submit, y recibido por la petición post
//la cual recibirá los datos del formulario y los parseará del body, los cual nos dará acceso
//a los valores que hay dentro de los inputbox del formulario, y mostrará en pantalla su contenido como
//respuesta.


app.post('/student', (req, res) =>{
    res.send(`First Name es: ${req.body.fname}, Last Name es: ${req.body.lname}`);
});
//Esta es una petición post, en la que nosotros "cachamos" lo valores que tienen fname y lname,
//los cuales podemos obtener con la ayuda de express, especificandole que está en el body.

//Es importante recalcar que los nombres del route handler de /student por post DEBE coincidir
//para que funcione con normalidad, por lo que hay que tener precaución en ese aspecto.

app.post('/personjson', express.json({type: '*/*'}), (req, res) => {
    console.log('El objeto contiene:', (req.body));
    console.log('Nombre:', req.body.firstname);
    console.log('Apellido:', req.body.lastname);
})
//En este route handler parseamos las peticiones json, y le decimos a express que parsee el contenido
//a json, y express nos deja usar las variables de firstname y lastname ya que las parsea.

//En el index agregaremos 2 cosas importantes, en el head y en el body, en el head usaremos  jquery cdn como fuente,
//y también en el body haremos uso de ajax Asynchronous Javascript And XML, la cual es una petición asíncrona, a esta le daremos
//algunos valores, como el de petición POST, la url, el dataType, el contentType y los datos. En los datos
//enviaremos un JSON con el método stringify, ya que en el body solo se puede enviar texto necesitamos que el JSON se convierta
//en un string, y al recibirlo el servidor lo convierta de nuevo en JSON.

app.listen(PORT);
