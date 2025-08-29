import { Component, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';

// Define your data type
interface NodeData {
  name: string;
  children?: NodeData[];
  description?: string;
}

@Component({
  selector: 'app-mindmap',
  templateUrl: './mindmap.component.html',
  styleUrls: ['./mindmap.component.css']
})
export class MindmapComponent implements OnInit {

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.createMindMap();
  }

  createMindMap() {
    const data: NodeData = {
      name: "Root",
      children: [
        {
          name: "Loops",
          children: [
            { name: "for loop", description: "Classic for loop iteration." },
            { name: "while loop", description: "Iterates while a condition is true." },
            { name: "for-each / lambda", description: "One-line loop using forEach or lambda." }
          ]
        },
        {
          name: "Collections",
          children: [
            { name: "List", description: "Ordered collection, allows duplicates." },
            { name: "Set", description: "Unordered, unique elements only." },
            { name: "Map", description: "Key-value pairs, fast lookup." }
          ]
        },
        {
          name: "Interfaces",
          children: [
            { name: "Interface", description: "Defines methods without implementation." },
            { name: "Functional Interface", description: "Single abstract method." }
          ]
        },
        {
          name: "Enums",
          children: [
            { name: "Enum", description: "Fixed set of constants." }
          ]
        },
        {
          name: "Spring Boot",
          children: [
            { name: "Preconfigured Defaults", description: "Auto configuration reduces boilerplate." },
            { name: "Embedded Server", description: "No need for external server setup." },
            { name: "Rapid Setup", description: "Start apps quickly with minimal configuration." }
          ]
        }
      ]
    };

    const width = 1320;  // allows for a wider separation from circles was 800 x 500 
    const height = 800;

    // Remove previous SVG if rerendering
    d3.select(this.el.nativeElement).selectAll('svg').remove();
    d3.select(this.el.nativeElement).selectAll('.tooltip').remove();

    const svg = d3.select(this.el.nativeElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

   /* 
   const root: d3.HierarchyNode<NodeData> = d3.hierarchy<NodeData>(data);

    // Type-safe tree layout
    const treeLayout: d3.TreeLayout<NodeData> = d3.tree<NodeData>().size([width - 100, height - 100]);
    treeLayout(root);
    */


    // Use HierarchyPointNode for nodes after layout
    const treeLayout = d3.tree<NodeData>().size([width - 100, height - 100]).separation((a,b) => (a.parent === b.parent ? 2 : 3));
    const root = d3.hierarchy<NodeData>(data);
    const treeRoot: d3.HierarchyPointNode<NodeData> = treeLayout(root as unknown as d3.HierarchyPointNode<NodeData>);


    // Tooltip
    const tooltip = d3.select(this.el.nativeElement)
          .append('div')
          .attr('class', 'mindmap-tooltip')
          .style('position', 'absolute')
          .style('background', '#333')
          .style('color', '#fff')
          .style('padding', '5px 10px')
          .style('border-radius', '5px')
          .style('pointer-events', 'none')
          .style('opacity', 0);

    // Links
   svg.selectAll('line')
      .data(treeRoot.links())
      .enter()
      .append('line')
      .attr('x1', d => (d.source as d3.HierarchyPointNode<NodeData>).x + 50)
      .attr('y1', d => (d.source as d3.HierarchyPointNode<NodeData>).y + 50)
      .attr('x2', d => (d.target as d3.HierarchyPointNode<NodeData>).x + 50)
      .attr('y2', d => (d.target as d3.HierarchyPointNode<NodeData>).y + 50)
      .attr('stroke', '#555');


    // Nodes
    svg.selectAll('circle')
      .data(root.descendants())
      .enter()
      .append('circle')
      .attr('cx', d => (d as d3.HierarchyPointNode<NodeData>).x + 50)
      .attr('cy', d => (d as d3.HierarchyPointNode<NodeData>).y + 50)
      .attr('r', d =>{ return 50 + (d.data.name.length > 10 ? 10: 0)})
      .attr('fill', '#1f77b4')
      .on('mouseover', function (event, d) {
        d3.select(this).attr('fill', '#ff7f0e');
        tooltip.transition().duration(200).style('opacity', 1);
        tooltip.html(d.data.description || 'No Description')
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY + 10) + 'px');
      })
      .on('mouseout', function () {
        d3.select(this).attr('fill', '#1f77b4');
        tooltip.transition().duration(200).style('opacity', 0);
      });

    // Labels
    svg.selectAll('text')
      .data(root.descendants())
      .enter()
      .append('text')
      .attr('x', d => (d as d3.HierarchyPointNode<NodeData>).x + 50)
      .attr('y', d => (d as d3.HierarchyPointNode<NodeData>).y + 50)
      .attr('dy', (d, i) => i === 0 ? 0 : 5) // centerpoint of text layout
      .attr('text-anchor', 'middle')
      .text(d => d.data.name)
      .attr('fill', 'white');
  }
   //manually wrap text of circle not implemented
   wrapText(text: string, width: number): string[] {
    const words = text.split(/\s+/);
    const lines: string[] = [];
    let line = '';

    for (const word of words) {
      const testLine = line ? line + ' ' + word : word;
      if (testLine.length * 6 > width) {  // approximate char width = 6px
        lines.push(line);
        line = word;
      } else {
        line = testLine;
      }
    }
    if (line) lines.push(line);
    return lines;
  }









}
