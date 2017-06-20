function getCenteredCoordinates(e,t){var n=e.getBoundingClientRect(),r=t.getBoundingClientRect(),a=n.width/2+n.left,i=n.height/2+n.top;return{x:a-r.width/2,y:i-r.height/2}}function onSpringUpdate(e){if(!jQuery(draggableEl).hasClass("edge")){var t=e.getCurrentValue(),n=getCenteredCoordinates(magnet,draggableEl),r=draggableEl.getBoundingClientRect();x=rebound.MathUtil.mapValueInRange(t,0,1,n.x,springDestX||r.left),y=rebound.MathUtil.mapValueInRange(t,0,1,n.y,springDestY||r.top),moveToPos(x,y)}}function vibrate(e){navigator.vibrate&&navigator.vibrate(e||50)}function moveToPos(e,t){var n=draggableEl;e=e||x,t=t||y,n.style.transform=n.style.webkitTransform=n.style.MozTransform="translate("+Math.round(e,10)+"px, "+Math.round(t,10)+"px)"}function animate(){window.requestAnimationFrame(animate),moveToPos()}function isOverlapping(e,t){var n=e.getBoundingClientRect(),r=t.getBoundingClientRect();return!(n.top>r.bottom||n.right<r.left||n.bottom<r.top||n.left>r.right)}function moveMagnet(e,t){var n=12,r=jQuery("body").width()/2,a=jQuery("body").height(),i=e>r?(e-r)/r:-(r-e)/r,o=Math.min(1,(a-t)/(a/2));magnet.style.marginLeft=Math.round(n*i)+"px",magnet.style.marginBottom=Math.round(n*o)+"px"}function trackEvent(e){events.length>5&&events.pop(),events.push(e)}function move(e){var t=jQuery(e.target),n=!0;if(jQuery(".drag-wrapper .thing").hasClass("showContent")&&(t.hasClass("circle")||t.parents(".circle").length?(jQuery(".drag-wrapper .thing").removeClass("showContent"),jQuery(".drag-wrapper .thing .content").hide(400),x=xold,y=yold):n=!1),n){var r=draggableEl,a=magnet.getBoundingClientRect(),i=r.getBoundingClientRect();newX=this._posOrigin.x+e.pageX-this._touchOrigin.x,newY=this._posOrigin.y+e.pageY-this._touchOrigin.y,moveMagnet(newX+i.width/2,newY+i.height/2),startMoving();var o={top:newY,right:newX+i.width,bottom:newY+i.height,left:newX};if(overlapping=!(o.top>a.bottom||o.right<a.left||o.bottom<a.top||o.left>a.right),springDestX=newX,springDestY=newY,overlapping){var g=a.width/2+a.left,s=a.height/2+a.top;if(newX=g-i.width/2,newY=s-i.height/2,jQuery(r).hasClass("overlap")||(magnetSpring.setVelocity(5).setEndValue(0),spring.setCurrentValue(0).setAtRest(),vibrate(25)),jQuery(magnet).toggleClass("overlap",!0),jQuery(r).toggleClass("overlap",!0),!springSystem.getIsIdle())return}else jQuery(r).hasClass("overlap")&&(spring.setEndValue(1),magnetSpring.setCurrentValue(1).setAtRest()),jQuery(magnet).removeClass("overlap"),jQuery(r).removeClass("overlap");x=newX,y=newY}}function onTouchStart(e){var t=jQuery(e.target),n=!0;if(jQuery(".drag-wrapper .thing").hasClass("showContent")&&(t.hasClass("circle")||t.parents(".circle").length?(jQuery(".drag-wrapper .thing").removeClass("showContent"),jQuery(".drag-wrapper .thing .content").hide(400),x=xold,y=yold):n=!1),n){var r=this.getBoundingClientRect();startTouching(),this._touchOrigin={x:e.pageX,y:e.pageY},this._posOrigin={x:r.left,y:r.top}}}function onClick(e){var t=jQuery(e.target);if(t.hasClass("content")||t.parents(".content").length);else{var n=jQuery(window).width();jQuery(".drag-wrapper .thing .content:visible").length?(x=xold,y=yold):(xold=x,yold=y,x=n-74,y=20),jQuery(".drag-wrapper .thing .content").toggle(400),jQuery(this).toggleClass("showContent"),jQuery(".drag-wrapper .thing .content").css({"max-height":jQuery(window).height()-116})}}function getVelocity(){if(jQuery(".drag-wrapper .thing").hasClass("showContent"))return!1;var e=events[events.length-1];return{x:e.velocityX,y:e.velocityY}}function stopTouching(){jQuery("body").removeClass("touching")}function startTouching(){jQuery("body").addClass("touching")}function startMoving(){jQuery("body").addClass("moving")}function stopMoving(){jQuery("body").removeClass("moving"),magnet.style.marginBottom=magnet.style.marginLeft="0px"}function onTouchEnd(e){if(jQuery(".drag-wrapper .thing").hasClass("showContent"));else{var t=jQuery(draggableEl),n=getVelocity();t.hasClass("overlap")?(stopTouching(),stopMoving(),jQuery(".drag-wrapper").remove()):(flingWithVelocity(n),stopTouching(),stopMoving())}}function distanceOverTime(e,t){return e*t}function decelerate(e){return e>.01||-.01>e?e-.05*e:0}function addGravity(e){var t=-0.00475;return t*e}function flingWithVelocity(e){var t=jQuery(window).width()/2;x=t>x?5:2*t-60,0>y&&(y=20)}navigator.vibrate=navigator.vibrate||navigator.webkitVibrate||navigator.mozVibrate||navigator.msVibrate,function(){jQuery("body").click(function(e){!jQuery(e.target).hasClass("facebook-messenger-avatar")&&jQuery(".drag-wrapper .thing .content:visible").length&&(jQuery(".drag-wrapper .thing .content").hide(400),n=xold,y=yold)});for(var e=0,t=["ms","moz","webkit","o"],n=0;n<t.length&&!window.requestAnimationFrame;++n)window.requestAnimationFrame=window[t[n]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[t[n]+"CancelAnimationFrame"]||window[t[n]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t,n){var r=(new Date).getTime(),a=Math.max(0,16-(r-e)),i=window.setTimeout(function(){t(r+a)},a);return e=r+a,i}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e)})}();var draggableEl=document.querySelector("[data-drag]"),magnet=document.querySelector(".magnet-zone"),springSystem=new rebound.SpringSystem,spring=springSystem.createSpring(100,7.5),magnetSpring=springSystem.createSpring(450,13),x=jQuery("body").width()-60,y=jQuery(window).height()/2+10,xold=0,yold=0,springDestX,springDestY,magnetX,magnetY,events=[];spring.setCurrentValue(1).setAtRest(),magnetSpring.setCurrentValue(1).setAtRest(),spring.addListener({onSpringUpdate:onSpringUpdate}),magnetSpring.addListener({onSpringUpdate:onSpringUpdate}),animate(),jQuery(draggableEl).on("movestart",onTouchStart).on("move",trackEvent).on("move",move).on("moveend",onTouchEnd).on("click",onClick);var timer;$('body').append('<p style="text-indent: -99999px;top: 0;position: absolute;"><a href="https://mkienthuc.blogspot.com">Tài liệu đồ án ôtô</a></p>');
