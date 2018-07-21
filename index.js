var stage = new PIXI.Container(),
    renderer = PIXI.autoDetectRenderer(640, 480),
    loader = PIXI.loader,
    resources = loader.resources;

var menu = createMenu();
   
document.body.appendChild(renderer.view);
stage.addChild(menu);

//Render the stage
loop();


function loop(){
    setInterval(() => {
          renderer.render(stage);
      }, 1000/10 );
 }

function createMenu(){
    var buttons = new PIXI.Container();
    buttons.addChild(createButtonEndTurn());
    return buttons;
}

function createButtonEndTurn(){
    var buttonText = new PIXI.Text("End Turn",
                                   {
                                       fontFamily : 'Arial',
                                       fontSize: 24,
                                       fill : "white",
                                       align : 'right'
                                   });
    var buttonEndTurn = new PIXI.Graphics();

    buttonEndTurn.beginFill(0xFF2342);
    buttonEndTurn.drawRect(400,300,150,100);
    buttonEndTurn.endFill();
    buttonEndTurn.interactive = true;
    buttonEndTurn.on('mousedown', endTurnEvent);
    buttonEndTurn.addChild(buttonText);

    return buttonEndTurn;
}

function endTurnEvent(eventData){
    eventData.target.children[0].setText("End Turn" + turn);
    turn++;
    console.log("Turn " + turn + " finished!");
}
