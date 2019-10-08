$(document).ready(function() {
  console.log("Easy Ready");
  //Forms
  $("body").on("click", ".passtoggle", function() {
    if ($(this).hasClass("mdi-eye-outline")) {
      $(this).removeClass("mdi-eye-outline");
      $(this).addClass("mdi-eye-off-outline");
    } else if ($(this).hasClass("mdi-eye-off-outline")) {
      $(this).removeClass("mdi-eye-off-outline");
      $(this).addClass("mdi-eye-outline");
    }
    var field = $(this)
      .parent()
      .find("input");
    if ($(field).attr("type") == "password") {
      $(field).attr("type", "text");
    } else if ($(field).attr("type") == "text") {
      $(field).attr("type", "password");
    }
  });

  //Animations
  var viewElems = $("[class*=viewanime]").withinviewport();
  $.each(viewElems, (ind, ele) => {
    var classAttribute = ele.className;

    var classes = classAttribute.split(" ");

    for (var i = 0; i < classes.length; i++) {
      if (classes[i].indexOf("viewanime") == 0) {
        var animations = classes[i].split("-");
        animations.shift();
        animations.forEach(anim => {
          if (anim === "wobble") {
            var wobbleTimeline = anime.timeline({});
            wobbleTimeline.add(wobbleIn(ele)).add(wobbleOut(ele));
          } else if (anim === "zoom") {
            var zoomTimeline = anime.timeline({});
            zoomTimeline.add(zoomIn(ele)).add(zoomOut(ele));
          } else {
            doAnimation(ele, anim);
          }
        });
        $(ele).removeClass(classes[i]);
        return;
      }
    }
  });
  $(window).on("scroll", function() {
    var viewElems = $("[class*=viewanime]").withinviewport();
    $.each(viewElems, (ind, ele) => {
      var classAttribute = ele.className;

      var classes = classAttribute.split(" ");

      for (var i = 0; i < classes.length; i++) {
        if (classes[i].indexOf("viewanime") == 0) {
          var animations = classes[i].split("-");
          animations.shift();
          animations.forEach(anim => {
            if (anim === "wobble") {
              var wobbleTimeline = anime.timeline({});
              wobbleTimeline.add(wobbleIn(ele)).add(wobbleOut(ele));
            } else if (anim === "zoom") {
              var zoomTimeline = anime.timeline({});
              zoomTimeline.add(zoomIn(ele)).add(zoomOut(ele));
            } else {
              doAnimation(ele, anim);
            }
          });
          $(ele).removeClass(classes[i]);
          return;
        }
      }
    });
  });

  $("[class*=hoveranime]")
    .on("mouseenter", function(event) {
      var classAttribute = event.target.className;

      var classes = classAttribute.split(" ");

      for (var i = 0; i < classes.length; i++) {
        if (classes[i].indexOf("hoveranime") == 0) {
          var animations = classes[i].split("-");
          animations.shift();
          animations.forEach(anim => {
            if (anim === "wobble") {
              wobbleIn(this);
            } else if (anim === "zoom") {
              zoomIn(this);
            } else {
              doAnimation(this, anim);
            }
          });
          return;
        }
      }
    })
    .on("mouseleave", function(event) {
      var classAttribute = event.target.className;

      var classes = classAttribute.split(" ");

      for (var i = 0; i < classes.length; i++) {
        if (classes[i].indexOf("hoveranime") == 0) {
          var animations = classes[i].split("-");
          animations.shift();
          animations.forEach(anim => {
            if (anim === "wobble") {
              wobbleOut(this);
            } else if (anim === "zoom") {
              zoomOut(this);
            }
          });
          return;
        }
      }
    });

  $("[class*=clickanime]").on("click", function(event) {
    var classAttribute = event.target.className;

    var classes = classAttribute.split(" ");

    for (var i = 0; i < classes.length; i++) {
      if (classes[i].indexOf("clickanime") == 0) {
        var animations = classes[i].split("-");
        animations.shift();
        animations.forEach(anim => {
          if (anim === "wobble") {
            var wobbleTimeline = anime.timeline({});
            wobbleTimeline.add(wobbleIn(this)).add(wobbleOut(this));
          } else if (anim === "zoom") {
            var zoomTimeline = anime.timeline({});
            zoomTimeline.add(zoomIn(this)).add(zoomOut(this));
          } else {
            doAnimation(this, anim);
          }
        });
        return;
      }
    }
  });
});

const wobbleIn = function(element) {
  var wobbleIn = anime({
    targets: element,
    scaleX: [1, 1.05],
    elasticity: 500,
    duration: 500
  });
  return wobbleIn;
};

const wobbleOut = function(element) {
  var wobbleout = anime({
    targets: element,
    scaleX: [1.05, 1],
    elasticity: 500,
    duration: 500
  });
  return wobbleout;
};

const fadeOut = function(element, direction = "center") {
  var props = {
    targets: element,
    duration: 500,
    easing: "linear",
    opacity: 0,
    complete: function(animat) {
      $(element).hide();
    }
  };
  if (direction === "left") {
    props.translateX = -36;
  } else if (direction === "right") {
    props.translateX = 36;
  } else if (direction === "up") {
    props.translateY = -36;
  } else if (direction === "down") {
    props.translateY = 36;
  }
  anime(props);
};

const fadeIn = function(element, direction = "center") {
  $(element).css({ opacity: 0 });
  var props = {
    targets: element,
    duration: 500,
    easing: "linear",
    opacity: 1,
    translateX: 0,
    translateY: 0,
    begin: function(animat) {
      $(element).show();
    }
  };
  if (direction === "left") {
    $(element).css("transform", "translateX(-36px)");
  } else if (direction === "right") {
    $(element).css("transform", "translateX(36px)");
  } else if (direction === "up") {
    $(element).css("transform", "translateY(-36px)");
  } else if (direction === "down") {
    $(element).css("transform", "translateY(36px)");
  }
  anime(props);
};

const zoomOut = element => {
  var zoomout = anime({
    targets: element,
    scale: [1.4, 1],
    duration: 500
  });
  return zoomout;
};

const zoomIn = element => {
  var zoomin = anime({
    targets: element,
    scale: [1, 1.4],
    duration: 800
  });
  return zoomin;
};

const popOut = element => {
  var popout = anime({
    targets: element,
    scale: [0, 1],
    duration: 800,
    begin: animation => {
      $(element).css('opacity', '1');
      $(element).show();
    }
  });
  return popout;
};

const popIn = element => {
  var popin = anime({
    targets: element,
    scale: [1, 0],
    easing: "linear",
    duration: 500,
    complete: animation => {
      $(element).hide();
    }
  });
  return popin;
};

const allAnimations = {
  fadeout: fadeOut,
  fadein: fadeIn,
  zoomout: zoomOut,
  zoomin: zoomIn,
  popin: popIn,
  popout: popOut,
  wobblein: wobbleIn,
  wobbleout: wobbleOut
};

function doAnimation(element, anim) {
  var specs = anim.split("from");
  if (specs.length === 1) {
    specs = specs[0].split("to");
  }
  if (specs.length > 1) {
    allAnimations[specs[0]](element, specs[1]);
  } else {
    allAnimations[specs[0]](element);
  }
}
