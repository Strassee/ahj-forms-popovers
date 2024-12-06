import { Tooltip } from "./components/tooltip";

document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector('.btn');
  const tooltip = new Tooltip();
  let actualMessages = [];
  let popover = {
    title: "Popover title",
    message: "And here's some amazing content. It's very engaging. Right?"
  };

  const onHandlerClick = (e) => {
    const el = e.target;
    if (!actualMessages.length) {
      showTooltip(popover, el);
    } else {
      removeTooltip(el);
    }
  }

  button.addEventListener('click', onHandlerClick);

  const showTooltip = (popover, el) => {
    actualMessages.push({
        name: el.name,
        id: tooltip.showTooltip(popover, el)
    })
  }

  const removeTooltip = (el) => {
    const currentErrorMessage = actualMessages.find(item => item.name === el.name);

    if(currentErrorMessage) {
        tooltip.removeTooltip(currentErrorMessage.id);
    }
    actualMessages.splice(actualMessages.indexOf(currentErrorMessage), 1);
  }
});
