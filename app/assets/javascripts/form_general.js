/**
 * Created by kevinkneelands on 11/21/16.
 */

// --------------------------------------------------
// action 1 = with messages , 2= without messages , 3 = clear messages
// --------------------------------------------------

function check_for_blanks( panel_id, self, action ) {
    var required_selector   = "#" + panel_id + "  .reqd";
    var radio_btns_selector = "#" + panel_id + " input:radio";
    var required_items = $(required_selector);
    var radio_btns     = $(radio_btns_selector);
    var the_div;
    var blank_items = 0;
    var radio_group_selector = "";

    switch( parseInt( action )) {
        case 1:
            required_items.each(function () {
                if ($(this).val().trim() == "") {
                    $(this).next("span").show();
                    ++blank_items;
                } else {
                    $(this).next("span").hide();
                }
            });

            radio_btns.each(function () {
                radio_group_selector = "#" + panel_id + "  input:radio[name='" + $(this).attr('name') + "']";
                if ($(radio_group_selector).is(":checked")) {
                    $(this).parent().next("span").hide();
                } else {
                    $(this).parent().next("span").show();
                    ++blank_items;
                }
            });
            break;

        case 2:
            required_items.each(function () {
                if ($(this).val().trim() == "") {
                    ++blank_items;
                }
            });

            radio_btns.each(function () {
                radio_group_selector = "#" + panel_id + "  input:radio[name='" + $(this).attr('name') + "']";
                if (!$(radio_group_selector).is(":checked")) {
                    ++blank_items;
                }
            });
            break;

        default:
            required_items.each(function () {
                $(this).next("span").hide();
            });

            radio_btns.each(function () {
                $(this).parent().next("span").hide();
            });
            break;
    }

    return(blank_items);

}

// --------------------------------------------------
// simply allows a button click to toggle a divs visibility
// --------------------------------------------------
function toggle_div_visibility( panel_id, self, div_class_name, div_above ) {
    var div_to_toggle  = "#" + panel_id + "  ." + div_class_name;
    var div_to_shorten = '#' + panel_id + "  ." + div_above;
    var toggle_height  = $(div_to_toggle).outerHeight();
    var above_height   = $(div_to_shorten).outerHeight();
    var new_height = 0;

    if ( $(div_to_toggle).is(':visible')) {
        new_height = above_height + toggle_height;
        $(div_to_shorten).outerHeight(new_height);
        $(div_to_toggle).hide();
    } else {
        new_height = above_height - toggle_height;
        $(div_to_shorten).outerHeight(new_height);
        $(div_to_toggle).show();
    }


}

