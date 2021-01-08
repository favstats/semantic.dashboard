/*
  SIDEBAR
*/
const initialize_sidebar = (closable, pushable, overlay, dimPage) => {
  console.log(closable, pushable, overlay, dimPage);
  $(document).ready(function() {
    $('.ui.sidebar')
    .sidebar({
      context: $('.bottom.segment'),
      closable,
      dimPage
    })

    $('#toggle_menu').click(function() {
      $(window).resize();
    })

    if(pushable) {
      $('.ui.sidebar').sidebar('attach events', '#toggle_menu');
    }

    /* Code below is needed to trigger visibility on reactive Shiny outputs. */
    /* Thanks to that users do not have to set suspendWhenHidden to FALSE.   */
    let previous_tab;
    $(`#uisidebar .item`).tab({
      onVisible: function(target) {
        if (previous_tab) {
          $(this).trigger('hidden');
        }
        $(window).resize();
        $(this).trigger('shown');
        previous_tab = this;
        prefix = "shiny-tab-"
        Shiny.setInputValue("uisidebar", this.id.substring(prefix.length), {priority: "event"});
      }
    });
  });
}
