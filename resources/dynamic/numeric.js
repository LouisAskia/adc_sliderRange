{%
Dim i
Dim rs = CurrentQuestion
Dim minVal = rs.MinValue
Dim maxVal = rs.MaxValue
%}

slider({
    start			: '{%= CurrentADC.PropValue("start_value") %}',
    end   			: '{%= CurrentADC.PropValue("end_value") %}',
    min				: {%= minVal %},
    max				: {%= maxVal %},
    step			: {%= CurrentADC.PropValue("step_value") %},
    margin 			: {%= CurrentADC.PropValue("margin_value") %},
    tooltips 		: {%= CurrentADC.PropValue("tooltip") %},
    orientation		: '{%= CurrentADC.PropValue("orientation") %}',
    direction		: '{%= CurrentADC.PropValue("direction") %}',
    startContent	: '{%= CurrentADC.PropValue("label_left") %}',
    endContent		: '{%= CurrentADC.PropValue("label_right") %}',
    density			: {%= CurrentADC.PropValue("scale_density") %},
    decimals 		: {%= CurrentADC.PropValue("decimal_nbr") %},
    mark			: '{%= CurrentADC.PropValue("decimal_separator") %}',
    thousand		: '{%= CurrentADC.PropValue("thousand_separator") %}',
    prefix			: '{%= CurrentADC.PropValue("prefix") %}',
    postfix			: '{%= CurrentADC.PropValue("postfix") %}',
    negative		: '{%= CurrentADC.PropValue("negative_prefix") %}',
    height			: '{%= CurrentADC.PropValue("slider_height") %}',
    width			: '{%= CurrentADC.PropValue("slider_width") %}',
    scaleRemote 	: '{%= CurrentADC.PropValue("scale_max_width") %}',
    labelPosition	: '{%= CurrentADC.PropValue("label_alignment") %}',
    questionType	: '{%= CurrentQuestion.Type %}',
    excluPosition	: '{%= CurrentADC.PropValue("exclusive_position") %}',
    instanceId		: {%= CurrentADC.InstanceId %}
});