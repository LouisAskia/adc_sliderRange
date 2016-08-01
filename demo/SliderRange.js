(function () {
    var currentInstanceId,
        currentInstance,
        optionsSliderCreation,
        numbers;
    var sliderConfig = {};
    
    function sliderCreation() {
        noUiSlider.create(currentInstance, {
            start		: [optionsSliderCreation.start, optionsSliderCreation.end],
            step		: optionsSliderCreation.step,
            margin		: optionsSliderCreation.margin,
            direction	: optionsSliderCreation.direction,
            orientation	: optionsSliderCreation.orientation,
            behaviour	: 'tap-drag',
            animate		: true,
            animationDuration : 300,
            connect		: true,
            tooltips	: optionsSliderCreation.tooltips,
            range		: {
                'min'		: optionsSliderCreation.min,
                'max'		: optionsSliderCreation.max
            },
            startContent 	: optionsSliderCreation.startContent,
            endContent		: optionsSliderCreation.endContent,
            pips: {
                mode		: 'steps',
                density		: optionsSliderCreation.density,
                format 		: wNumb({
                    decimals 	: optionsSliderCreation.decimals,
                    thousand 	: optionsSliderCreation.thousand,
                    mark		: optionsSliderCreation.mark,
                    prefix		: optionsSliderCreation.prefix,
                    postfix		: optionsSliderCreation.postfix,
                    negative	: optionsSliderCreation.negative
                })
            },
            format 		: wNumb({
                decimals 	: optionsSliderCreation.decimals,
                thousand 	: optionsSliderCreation.thousand,
                mark		: optionsSliderCreation.mark,
                prefix		: optionsSliderCreation.prefix,
                postfix		: optionsSliderCreation.postfix,
                negative	: optionsSliderCreation.negative
            }),
            instanceId		: optionsSliderCreation.instanceId
        });
        currentInstance.style.height = optionsSliderCreation.height;
        currentInstance.style.width = optionsSliderCreation.width;
    };
    
    function createInputs() {
        var hiddenInputs = document.getElementById('hidden-inputs-' + currentInstanceId);
        var ul = document.createElement('ul');
        if (optionsSliderCreation.questionType === "multiples") {

            var pipsNumber = (optionsSliderCreation.max - optionsSliderCreation.min) / optionsSliderCreation.step;

            for (var i = 0; i <= pipsNumber; i++) {   
                var li = document.createElement('li');
                var newInput = document.createElement('input');
                newInput.type = "radio";
                newInput.name = "adc-slider-range-" + currentInstanceId + '-' + i;
                newInput.classList.add('input-slider');
                newInput.classList.add('input-slider-' + currentInstanceId);
                li.appendChild(newInput);
                ul.appendChild(li);
            }
        }
        else if (optionsSliderCreation.questionType === "numeric") {
            for (var i = 0; i < 2; i++) {
                var li = document.createElement('li');
                var newInput = document.createElement('input');
                newInput.type = "number";
                newInput.name = "adc-slider-range-" + currentInstanceId + '-' + i;
                newInput.classList.add('input-slider');
                newInput.classList.add('input-slider-' + currentInstanceId);
                li.appendChild(newInput);
                ul.appendChild(li);
            }
        }
        hiddenInputs.appendChild(ul);
    };    
    
    function getNumber(instanceId, value) {
        return sliderConfig[instanceId].elements.noUiSlider.options.format.from(value);
    }
    
    function stateOn(instanceId) {
        var bar = sliderConfig[instanceId].elements.bar;
        var tooltip = sliderConfig[instanceId].elements.tooltip;
        bar.classList.add('stateOn');
        for (var i = 0, l = tooltip.length; i < l; i++) {
            tooltip[i].style.display = "block";
        }
        bar.classList.remove('stateOff');
    }
    
    function stateOff(instanceId) {
        var bar = sliderConfig[instanceId].elements.bar;
        var tooltip = sliderConfig[instanceId].elements.tooltip;
        bar.classList.add('stateOff');
        for (var i = 0, l = tooltip.length; i < l; i++) {
            tooltip[i].style.display = "none";
        }
        bar.classList.remove('stateOn');
    }
    
    function uncheck(instanceId) {
        var inputs = sliderConfig[instanceId].elements.inputs;
        var exclus = sliderConfig[instanceId].elements.inputExclu;
        var nbrs = sliderConfig[instanceId].elements.numbers;

        for (var i = 0, l = inputs.length; i < l; i++) {
            inputs[i].checked = false;
        }
        for (var i = 0, l = exclus.length; i < l; i++) {
            exclus[i].checked = false;
        }
        for (var i = 0, l = nbrs.length; i < l; i++) {
            nbrs[i].classList.remove("currentNumber");
        }

    }
    
    function allNull(instanceId) {
        var inputs = sliderConfig[instanceId].elements.inputs;
        var exclus = sliderConfig[instanceId].elements.inputExclu;
        var nbrs = sliderConfig[instanceId].elements.numbers;

        for (var i = 0, l = inputs.length; i < l; i++) {
            if (inputs[i].type !== "button") {
                inputs[i].value = null;
            }
        }
        for (var i = 0, l = exclus.length; i < l; i++) {
            exclus[i].value = null;
        }
        for (var i = 0, l = nbrs.length; i < l; i++) {
            nbrs[i].classList.remove("currentNumber");
        }
    }
    
    function checkMultiples(instanceId) {
        var inputs = sliderConfig[instanceId].elements.inputs;
        var nbrs = sliderConfig[instanceId].elements.numbers;
        stateOn(instanceId);
        uncheck(instanceId);
        
        var step = sliderConfig[instanceId].step;
        var pos = sliderConfig[instanceId].elements.noUiSlider.get();
        var pos1 = getNumber(instanceId, pos[0]);
        var pos2 = getNumber(instanceId, pos[1]);

        var pos1Ready = true;
        for (var i = 0, l= nbrs.length; i < l; i++) {
            var number = parseFloat(getNumber(instanceId, nbrs[i].textContent));
            if (pos1 === number && pos1Ready) {
                pos1 = i;
                pos1Ready = false;
            }
            if (pos2 === number) {
                pos2 = i;
                break;
            }
        }

        nbrs[pos1].classList.add("currentNumber");
        nbrs[pos2].classList.add("currentNumber");
        inputs[pos1].checked = true;
        inputs[pos2].checked = true;
    }
    
    function checkNumeric(instanceId) {
        var inputs = sliderConfig[instanceId].elements.inputs;
        var nbrs = sliderConfig[instanceId].elements.numbers;

        allNull(instanceId);
        stateOn(instanceId);
        var pos = sliderConfig[instanceId].elements.noUiSlider.get();
        var pos1 = getNumber(instanceId, pos[0]);
        var pos2 = getNumber(instanceId, pos[1]);
       
        inputs[0].value = pos1;
        inputs[1].value = pos2;

        var pos1Ready = true;
        for (var i = 0, l= nbrs.length; i < l; i++) {
            var number = parseFloat(getNumber(instanceId, nbrs[i].textContent));
            if (pos1 === number && pos1Ready) {
                pos1 = i;
                pos1Ready = false;
            }
            if (pos2 === number) {
                pos2 = i;
                break;
            }
        }
        nbrs[pos1].classList.add("currentNumber");
        nbrs[pos2].classList.add("currentNumber");
    }
    
    function exclusivesMultiples(exclusive, instanceId) {
        sliderConfig[instanceId].elements.noUiSlider.set([sliderConfig[instanceId].start, sliderConfig[instanceId].end]);
        stateOff(instanceId);
        uncheck(instanceId);
        for (var i = 0, l = sliderConfig[instanceId].elements.exclusives.length; i < l; i++) {
            if (sliderConfig[instanceId].elements.exclusives[i] === exclusive) {
                sliderConfig[instanceId].elements.inputExclu[i].checked = true;
                return;
            }
        }
    }
    
    function exclusivesNumeric(exclusive, instanceId) {
        sliderConfig[instanceId].elements.noUiSlider.set([sliderConfig[instanceId].start, sliderConfig[instanceId].end]);
        stateOff(instanceId);
        allNull(instanceId);
        
        for (var i = 0, l = sliderConfig[instanceId].elements.exclusives.length; i < l; i++) {
            if (sliderConfig[instanceId].elements.exclusives[i] === exclusive) {
                sliderConfig[instanceId].elements.inputExclu[i].value = 1;
            }
        }
    }
    
    function init() {
        var handles = currentInstance.getElementsByClassName('noUi-handle');
        if (optionsSliderCreation.orientation === "horizontal" && sliderConfig[currentInstanceId].height.replace(/\D/g, "") > 20) {
            for (var i = 0, l = handles.length; i < l; i++) {
                var newHeight = parseInt(sliderConfig[currentInstanceId].height.replace(/\D/g, "")) + 10;
                handles[i].style.height = newHeight + "px";
            }
        } else if (optionsSliderCreation.orientation === "vertical" && sliderConfig[currentInstanceId].width.replace(/\D/g, "") > 20) {
            for (var i = 0, l = handles.length; i < l; i++) {
                var newWidth = parseInt(sliderConfig[currentInstanceId].width.replace(/\D/g, "")) + 10;
                handles[i].style.width = newWidth + "px";
            }
        }
        numbers = Array.prototype.slice.call(currentInstance.querySelectorAll('.noUi-value-sub'));
        var startAndEnd = currentInstance.querySelectorAll('.noUi-value-large');
        numbers.unshift(startAndEnd[0]);
        numbers.push(startAndEnd[1]);
        sliderConfig[currentInstanceId].elements.numbers = numbers;

        currentInstance.noUiSlider.on('update', function() {
            var instanceId = this.options.instanceId;
            if (sliderConfig[instanceId].questionType === "multiples") {
                checkMultiples(instanceId);
            } else if (sliderConfig[instanceId].questionType === "numeric") {
                checkNumeric(instanceId)
            }
        });

        currentInstance.noUiSlider.on('end', function() {
            var instanceId = this.options.instanceId;
            if (sliderConfig[instanceId].questionType === "multiples") {
                checkMultiples(instanceId);
            } else if (sliderConfig[instanceId].questionType === "numeric") {
                checkNumeric(instanceId);
            }
        });

        currentInstance.noUiSlider.on('change', function() {
            var instanceId = this.options.instanceId;
            if (sliderConfig[instanceId].questionType === "multiples") {
                checkMultiples(instanceId);
            } else if (sliderConfig[instanceId].questionType === "numeric") {
                checkNumeric(instanceId);
            }
        });
        
        var exclusives = sliderConfig[currentInstanceId].elements.exclusives;
        for (var i = 0, l = exclusives.length; i < l; i++) {
            exclusives[i].instanceId = currentInstanceId;
            exclusives[i].addEventListener('click', function() {
                if (sliderConfig[this.instanceId].questionType === "multiples") {
                    exclusivesMultiples(this, this.instanceId);
                } else if (sliderConfig[this.instanceId].questionType === "numeric") {
                    exclusivesNumeric(this, this.instanceId);
                }
            });
        }
        
        var startAndEnd = document.querySelectorAll('.startAndEnd-' + currentInstanceId);
        var start = startAndEnd[0];
        var end = startAndEnd[1];
        var height = currentInstance.style.height.replace(/\D/g, "");

        if (optionsSliderCreation.orientation === "horizontal") {
            switch (optionsSliderCreation.labelPosition) {
                case "top" :
                    for (var i = 0, l = startAndEnd.length; i < l; i++) {
                        startAndEnd[i].style.marginTop = -height - 50 + "px";
                    }
                    break;
                case "bottom" :
                    for (var i = 0, l = startAndEnd.length; i < l; i++) {
                        startAndEnd[i].style.marginTop = "80px";
                    }
                    break;
                case "side" :
                    start.style.marginTop = - height - 8 + "px";
                    end.style.marginTop = - height - 8 + "px";
                    end.style.left = "103%"
                    start.style.left = "-10%"

                    break;
            }
        } else if (optionsSliderCreation.orientation === "vertical") {
            switch (optionsSliderCreation.labelPosition) {
                case "side" :
                    start.style.marginTop = - height - 50 + "px";
                    end.style.marginTop = "20px";
                    end.style.left = "0%";
                    break;
                case "left" :
                    start.style.marginTop = - height + "px";
                    start.style.marginLeft = "-100px";
                    end.style.marginTop = "-30px";
                    end.style.left = "0%";
                    end.style.marginLeft = "-100px";
                    break;
                case "right" :
                    start.style.marginTop = - height + "px";
                    start.style.marginLeft = "120px";
                    end.style.marginTop = "-30px";
                    end.style.left = "0%";
                    end.style.marginLeft = "120px";
                    break;
            }
        }

        stateOff(currentInstanceId);
        if (optionsSliderCreation.questionType === "multiples") {
            uncheck(currentInstanceId);
        } else if (optionsSliderCreation.questionType === "numeric") {
            allNull(currentInstanceId);
        }

        window.onresize = function (){
            for (var instanceId in sliderConfig) {
                if (window.outerWidth <= sliderConfig[instanceId].scaleRemote) {
                    var scale = sliderConfig[instanceId].instance.querySelector('.noUi-pips');
                    scale.style.display = "none";
                } else if (window.outerWidth >= sliderConfig[instanceId].scaleRemote) {
                    var scale = sliderConfig[instanceId].instance.querySelector('.noUi-pips');
                    scale.style.display = "block";
                }
            }
        };
        
        if (sliderConfig.instanceId > 1) {
            currentInstance.style.marginTop = 100 + "px";
        }
    };
    
    window.slider = function(options) {
        currentInstanceId = options.instanceId;
        currentInstance = document.getElementById('sliderRange-' + currentInstanceId);

        if (isNaN(options.width) && options.orientation === "horizontal") {
            options.width = 800;
        }
        if (isNaN(options.width) && options.orientation === "vertical") {
            options.width = 20;
        }
        if (isNaN(options.height) && options.orientation === "horizontal") {
            options.height = 20;
        }
        if (isNaN(options.height) && options.orientation === "vertical") {
            options.height = 800;
        }
        
        sliderConfig[currentInstanceId] = {
            start			: options.start || 33,
            end   			: options.end || 66,
            min				: options.min || 0,
            max				: (!isNaN(options.max))? options.max : 100,
            step			: options.step || 1,
            margin 			: options.margin || 0,
            tooltips 		: options.tooltips,
            orientation		: options.orientation || "horizontal",
            direction		: options.direction || "ltr",
            startContent	: options.startContent || false,
            endContent		: options.endContent || false,
            density			: options.density || 1,
            decimals 		: options.decimals || 0,
            mark			: options.mark || ",",
            prefix			: options.prefix || "",
            postfix			: options.postfix || "",
            negative		: options.negative || "-",
            height			: options.height + "px",
            width			: options.width + "px",
            scaleRemote 	: options.scaleRemote || 500,
            labelPosition	: options.labelPosition,
            questionType	: options.questionType,
            instanceId		: currentInstanceId,
            instance		: currentInstance,
            excluPosition	: options.excluPosition || "center",
            elements 		: {
                bar 		: null,
                inputs 		: null,
                exclusives 	: null,
                inputExclu 	: null,
                tooltip 	: null,
                noUiSlider 	: null,
                numbers		: null,
            }
        }
        
        var excluContainer = document.getElementById("container-" + currentInstanceId);
        sliderConfig[currentInstanceId].elements.inputExclu = excluContainer.getElementsByClassName('input-exclusive');
        sliderConfig[currentInstanceId].elements.exclusives = excluContainer.getElementsByClassName('exclusive');
        
        optionsSliderCreation = sliderConfig[currentInstanceId];
        sliderCreation();
        createInputs();
        sliderConfig[currentInstanceId].elements.bar = currentInstance.getElementsByClassName('noUi-connect')[0];
        sliderConfig[currentInstanceId].elements.tooltip = currentInstance.getElementsByClassName('noUi-tooltip');
        sliderConfig[currentInstanceId].elements.inputs = document.getElementsByClassName('input-slider-' + currentInstanceId);
        sliderConfig[currentInstanceId].elements.noUiSlider = currentInstance.noUiSlider;
        init();
    }
})();