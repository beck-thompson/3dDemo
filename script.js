// TODO:
// TRY DIFFERENT COLORS BACKGROUND ETC...
// PAN FUNCTION
//
// TO FIX:
// NAME ROTATION MATRIX CORRETCTLY. X, Y WHAT??
// FIX ROTATED POINTS / ORINGAL POINTS. CONFUSING AND NEEDS SIMPLIFICATION
// FIX THE DELTA X AND Y! SUPER CONFUSING RIGHT NOW!!!!

// REMEMBER USER MATRIX IS A STRING!! SOMEHOW THATS THE EASIEST WAY TO DO IT???

console.log("Script running!")

canvas = document.getElementById("main_canvas")
console.log(canvas)

canvas.width  = 600
canvas.height = 600

document.getElementById("a1").value = 1
document.getElementById("a2").value = 0
document.getElementById("a3").value = "x"

document.getElementById("b1").value = 0
document.getElementById("b2").value = 1
document.getElementById("b3").value = "x"

document.getElementById("c1").value = "x"
document.getElementById("c2").value = 0
document.getElementById("c3").value = 1


console.log("Width:  " + canvas.width)
console.log("Height: " + canvas.height)

ctx = canvas.getContext("2d")

document.getElementById("thebutton").addEventListener("click", function() {
  newMatrix = document.getElementById("userinputmatrix").value.split(",")

  object_render_list.push(
    {
      orignal_points: [
        [0,0,0],
        [newMatrix[0],newMatrix[1],newMatrix[2]]
      ],

      current_points: [
        [0,0,0],
        [newMatrix[0],newMatrix[1],newMatrix[2]]
      ],

      lines: [
        [0,1, "black"],
      ],

      location: [0,0,0],

      axis: false
    }
  )
})

canvas.addEventListener('click', function() {
  if (unlocked) {
    unlocked = false
  } else {
    unlocked = true;
  }
  console.log("Ununlocked: " + unlocked)
});


document.onmousemove = function(e) {
  // return null

  if (unlocked) {
    x = - 8 - delta_x + e.clientX
    y = - 8 - delta_y + e.clientY
  } else {
    delta_x = e.clientX - x
    delta_y = e.clientY - y
  }
  // x=0
  // y=0

  //console.log("(" + e.clientX + ", " + e.clientY + ")")
};

window.addEventListener("wheel", event => {
    const delta = Math.sign(event.deltaY);

    if (delta==-1) {
      scale = scale * 1.1
      console.log("Increasing scale by 10%")
    }

    if (delta==1) {
      scale = scale / 1.1
      console.log("Decreasing scale by 10%")
    }

});

// document.onkeydown = function (e) {
//     // use e.keyCode
//     if (e.key == "ArrowUp") {
//       y_offset-=5
//     }
//     if (e.key == "ArrowDown") {
//       y_offset+=5
//     }
//     if (e.key == "ArrowLeft") {
//       x_offset-=5
//     }
//     if (e.key == "ArrowRight") {
//       x_offset+=5
//     }
// };

// global vars
var x_offset = 0
var y_offset = 0
// mouse position
var x = 0;
var y = 0;

var held_x = 0;
var held_y = 0;

delta_x = 0
delta_y = 0

var z = 1;
var scale = 1;
var unlocked = true;

function radToDeg(rad) {
  return (180 * rad) / Math.PI
}

function matrixMultiplication (matrix1, matrix2) {

  let returnMatrix = new Array(matrix2.length)

  for (let i=0; i<returnMatrix.length; i++) {
    returnMatrix[i] = new Array(matrix1[0].length).fill(0)
  }

  for (let n2=0; n2<matrix2.length; n2++) {
    for (let n1=0; n1<matrix1.length; n1++) {
      for (let m1=0; m1<matrix1[n1].length; m1++) {
        value = matrix1[n1][m1] * matrix2[n2][n1] // + " "
        returnMatrix[n2][m1] = returnMatrix[n2][m1] + value
      }
    }
  }

  return returnMatrix
}

function drawLine(start_x_y, end_x_y, offset, color, center) {
  // Gets 3d point but ignores z axis.
  // Center to middle of canvas!
  canvas_offset_x = 0 + x_offset
  canvas_offset_y = 0 + y_offset
  if (center) {
    canvas_offset_x += canvas.width  / 2
    canvas_offset_y += canvas.height / 2
  }

  ctx.lineWidth = 2;
  ctx.strokeStyle = color
  ctx.beginPath()
    ctx.moveTo(start_x_y[0]+offset[0]+canvas_offset_x, start_x_y[1]+offset[1]+canvas_offset_y)
    ctx.lineTo(end_x_y[0]+offset[0]+canvas_offset_x,end_x_y[1]+offset[1]+canvas_offset_y)
  ctx.stroke()
}

function drawPoint(cords,radius,color) {
  offset = 0
  ctx.lineWidth = 2;
  ctx.strokeStyle = color
  ctx.fillStyle = color;
  ctx.beginPath()
    ctx.arc(cords[0]+canvas.width  / 2, cords[1]+canvas.height / 2, radius, 0, 2*Math.PI, false)
    ctx.fill()
  ctx.stroke()
}


function getUserMatrix() {
  returnMatrix = [
    [document.getElementById("a1").value,document.getElementById("a2").value,document.getElementById("a3").value],
    [document.getElementById("b1").value,document.getElementById("b2").value,document.getElementById("b3").value],
    [document.getElementById("c1").value,document.getElementById("c2").value,document.getElementById("c3").value]
  ]

  for (let n=0; n<returnMatrix.length; n++) {
    for (let m=0; m<returnMatrix[n].length; m++) {

      //console.log(returnMatrix[n][m].indexOf("x"))

      if (returnMatrix[n][m] == "x") {
        returnMatrix[n][m] = document.getElementById("x").value
      }

      if (returnMatrix[n][m] == "sin(x)") {
        returnMatrix[n][m] = Math.sin(Math.PI * document.getElementById("x").value)
      }

      if (returnMatrix[n][m] == "cos(x)") {
        returnMatrix[n][m] = Math.cos(Math.PI * document.getElementById("x").value)
      }

      if (returnMatrix[n][m] == "-cos(x)") {
        returnMatrix[n][m] = -Math.cos(Math.PI * document.getElementById("x").value)
      }

      if (returnMatrix[n][m] == "-sin(x)") {
        returnMatrix[n][m] = -Math.sin(Math.PI * document.getElementById("x").value)
      }

    }
  }

  return returnMatrix;
}

grid = {
  orignal_points: [
    //[0,0,0],



      [100,10,0],
      [100,20,0],
      [100,30,0],
      [100,40,0],
      [100,50,0],
      [100,60,0],
      [100,70,0],
      [100,80,0],
      [100,90,0],
      [100,100,0],

      [0,10,0],
      [0,20,0],
      [0,30,0],
      [0,40,0],
      [0,50,0],
      [0,60,0],
      [0,70,0],
      [0,80,0],
      [0,90,0],
      [0,100,0],


  ],

  current_points: [
    [0,0,0],
    [10,0,0],
    [20,0,0],
    [30,0,0],
    [40,0,0],
    [50,0,0],
    [60,0,0],
    [70,0,0],
    [80,0,0],
    [90,0,0],
    [100,0,0],
  ],

  lines: [
    [0,10, "purple"],
    [1,11, "purple"],
    [2,12, "purple"],
    [3,13, "purple"],
    [4,14, "purple"],
    [5,15, "purple"],
    [6,16, "purple"],
    [7,17, "purple"],
    [8,18, "purple"],
    [9,19, "purple"],



  ],

  location: [0,0,0],
  axis: false
}

triangle = {
  orignal_points: [

    [0,0,0],
    [100,0,0],
    [0,100,0],
    [100,100,0],

    [50,50,100],

  ],

  current_points: [
    [0,0,0],
    [100,0,0],
    [0,100,0],
    [100,100,0],

    [50,50,100],
  ],

  lines: [
    [0,1, "purple"],
    [0,2, "purple"],
    [2,3, "purple"],
    [1,3, "purple"],

    [0,4, "purple"],
    [1,4, "purple"],
    [2,4, "purple"],
    [3,4, "purple"],

  ],

  location: [0,0,0],
  axis: false

}

square = {

  orignal_points: [
    [0,0,0],
    [100,0,0],
    [100,100,0],
    [0,100,0],

    [0,0,100],
    [100,0,100],
    [100,100,100],
    [0,100,100]
  ],

  current_points: [
    [0,0,0],
    [100,0,0],
    [100,100,0],
    [0,100,0],

    [0,0,100],
    [100,0,100],
    [100,100,100],
    [0,100,100]
  ],

  lines: [
    [0,1, "orange"],
    [1,2, "orange"],
    [2,3, "orange"],
    [3,0, "orange"],

    [4,5, "orange"],
    [5,6, "orange"],
    [6,7, "orange"],
    [7,4, "orange"],

    [0,4, "orange"],
    [1,5, "orange"],
    [2,6, "orange"],
    [3,7, "orange"]

  ],

  location: [0,0,0],
  axis: false

}

x_y_z_axis = {
  orignal_points: [
    [0,0,0],
    [300,0,0],
    [0,300,0],
    [0,0,300]
  ],

  current_points: [
    [0,0,0],
    [300,0,0],
    [0,300,0],
    [0,0,300]
  ],

  lines: [
    [0,1, "red"],
    [0,2, "blue"],
    [0,3, "green"]
  ],

  location: [0,0,0],

  axis: true
}

object_render_list = [
  x_y_z_axis,
  square,
  //grid
  //triangle,
]

function render() {
  ctx.clearRect(0,0,canvas.width,canvas.height)

  let rad = 2 * Math.PI * (-y) / 600

  let x_rotation = [1, 0, 0]
  let y_rotation = [0, Math.cos(rad), Math.sin(rad)]
  let z_rotation = [0, Math.cos(rad+Math.PI/2), Math.sin(rad+Math.PI/2)]

  let rotation_matrix_1 = [
    x_rotation, y_rotation, z_rotation
  ]

  rad = 2 * Math.PI * (x) / 600

  x_rotation = [Math.cos(rad), 0, Math.sin(rad)]
  y_rotation = [0, 1, 0]
  z_rotation = [Math.cos(rad+Math.PI/2), 0, Math.sin(rad+Math.PI/2)]

  let rotation_matrix_2 = [
    x_rotation, y_rotation, z_rotation
  ]

  let s = scale

  x_scale = [1*s,0,0]
  y_scale = [0,1*s,0]
  z_scale = [0,0,1*s]

  scale_matrix = [
    x_scale, y_scale, z_scale
  ]

  nothing = [
    [1,0,0],
    [0,1,0],
    [0,0,1]
  ]


  e = Math.PI/4

  // rotatex = [
  // [1,0,0],
  // [0,Math.cos(e),Math.sin(e)],
  // [0,-Math.sin(e),Math.cos(e)],
  // ]
  //
  // rotatey = [
  // [Math.cos(e),0,-Math.sin(e)],
  // [0,1,0],
  // [Math.sin(e),0,Math.cos(e)],
  // ]

  matrix = nothing

  if (document.getElementById("matrix_checkbox").checked) {
    matrix = getUserMatrix()
  }


  for (object_counter=0; object_counter<object_render_list.length; object_counter++) {
    object = object_render_list[object_counter]
    //console.log(rotationVector)

    // Use the orignal points first then use the rotated ones!!!!!!!!!!
    if(object.axis == false) {
      object.current_points = matrixMultiplication(matrix, object.orignal_points)
    } else {
      object.current_points = matrixMultiplication(nothing, object.orignal_points)
    }

    object.current_points = matrixMultiplication(rotation_matrix_1, object.current_points)
    object.current_points = matrixMultiplication(rotation_matrix_2, object.current_points)

  //  object.current_points = matrixMultiplication(rotatex, object.current_points)
  //  object.current_points = matrixMultiplication(rotatey, object.current_points)

    object.current_points = matrixMultiplication(scale_matrix, object.current_points)


    if (object.axis == true) {
      for(let i=0; i<object.lines.length; i++) {

        drawLine(
          // First point
          object.current_points[object.lines[i][0]],
          // Second point
          object.current_points[object.lines[i][1]],
          // Offset
          object.location,
          // Color
          object.lines[i][2],
          // Center
          true
        )

      }
    } else {

    for(let i=0; i<object.lines.length; i++) {

      drawLine(
        // First point
        object.current_points[object.lines[i][0]],
        // Second point
        object.current_points[object.lines[i][1]],
        // Offset
        object.location,
        // Color
        object.lines[i][2],
        // Center
        true
      )

    }

    // for(let i=0; i<object.current_points.length; i++) {
    //
    //
    //   drawLine(
    //     // First point
    //     [0,0,0],
    //     // Second point
    //     object.current_points[i],
    //     // Offset
    //     object.location,
    //     // Color
    //     "gray",
    //     // Center
    //     true
    //   )
    //
    //   drawPoint (
    //     object.current_points[i],
    //     3,
    //     // Color
    //     "black"
    //   )
    //
    // }
  }
  }
}


c=0
render()


setInterval(function() {
  c=c+.01
  render()
}, 1000/60)
