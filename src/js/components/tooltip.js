export class Tooltip {
  constructor() {
   this._tooltips = [];
  }

  showTooltip(popover, element) {
    const tooltipElement = document.createElement('div');
    tooltipElement.classList.add('tooltip');

    const tooltipHeader = document.createElement('div');
    tooltipHeader.classList.add('tooltip-header');
    tooltipHeader.textContent = popover.title;
    tooltipElement.append(tooltipHeader);

    const tooltipBody = document.createElement('div');
    tooltipBody.classList.add('tooltip-body');
    tooltipBody.textContent = popover.message;
    tooltipElement.append(tooltipBody);

    const id = performance.now();

    this._tooltips.push({
      id,
      element: tooltipElement
    })

    document.body.appendChild(tooltipElement);

    const { left, top } = element.getBoundingClientRect();
    tooltipElement.style.left = left + element.offsetWidth / 2 - tooltipElement.offsetWidth / 2 + 'px';
    tooltipElement.style.top = top - 10 - tooltipElement.offsetHeight + 'px';

    return id;
  }

  removeTooltip(id) {
    const tooltip = this._tooltips.find(t => t.id === id);
    tooltip.element.remove();
    this._tooltips = this._tooltips.filter(t => t.id !== id);
  }
}