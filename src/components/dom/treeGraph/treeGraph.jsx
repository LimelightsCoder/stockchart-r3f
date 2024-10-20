'use client';
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const TreeGraph = ({ data }) => {
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 928, height: 800 });
  const margin = { top: 10, right: 10, bottom: 10, left: 40 };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth * 0.9; // Adjust as necessary
      setDimensions({ width, height: dimensions.height }); // Keep height unchanged for now
    };

    handleResize(); // Set initial dimensions

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous graph

    const root = d3.hierarchy(data);
    
    // Calculate spacing
    const dx = 10; // Vertical spacing
    const dy = (dimensions.width - margin.right - margin.left) / (1 + root.height); // Horizontal spacing
    
    // Define tree layout
    const tree = d3.tree().nodeSize([dx, dy]);
    const diagonal = d3.linkHorizontal().x(d => d.y).y(d => d.x);

    // Calculate height based on the layout
    tree(root);
    const height = d3.max(root.descendants(), d => d.x) + margin.top + margin.bottom;

    svg.attr("width", dimensions.width)
       .attr("height", height)
       .attr("viewBox", [-margin.left, -margin.top, dimensions.width, height])
       .style("max-width", "100%")
       .style("height", "auto")
       .style("font", "10px sans-serif")
       .style("user-select", "none");

    const gLink = svg.append("g")
        .attr("fill", "none")
        .attr("stroke", "#555")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 1.5);

    const gNode = svg.append("g")
        .attr("cursor", "pointer")
        .attr("pointer-events", "all");

    const update = (event, source) => {
      const duration = event?.altKey ? 2500 : 250; // Hold the alt key to slow down the transition
      const nodes = root.descendants().reverse();
      const links = root.links();

      // Update nodes and links
      const node = gNode.selectAll("g")
        .data(nodes, d => d.id);

      const nodeEnter = node.enter().append("g")
          .attr("transform", d => `translate(${source.y0},${source.x0})`)
          .attr("fill-opacity", 0)
          .attr("stroke-opacity", 0)
          .on("click", (event, d) => {
            d.children = d.children ? null : d._children;
            update(event, d);
          });

      nodeEnter.append("circle")
          .attr("r", 4)
          .attr("fill", d => d._children ? "#00B8ff" : "#999")
          .attr("stroke-width", 10);

      nodeEnter.append("text")
          .attr("dy", "0.31em")
          .attr("x", d => d._children ? -6 : 6)
          .attr("text-anchor", d => d._children ? "end" : "start")
          .text(d => d.data.name)
          .attr("stroke-linejoin", "round")
          .attr("stroke-width", 3)
          .attr("stroke", "white")
          .attr("paint-order", "stroke")
          .style('font-size', '12px');
          

      const nodeUpdate = node.merge(nodeEnter).transition()
          .duration(duration)
          .attr("transform", d => `translate(${d.y},${d.x})`)
          .attr("fill-opacity", 1)
          .attr("stroke-opacity", 1);

      const nodeExit = node.exit().transition()
          .duration(duration)
          .remove()
          .attr("transform", d => `translate(${source.y},${source.x})`)
          .attr("fill-opacity", 0)
          .attr("stroke-opacity", 0);

      const link = gLink.selectAll("path")
        .data(links, d => d.target.id);

      const linkEnter = link.enter().append("path")
          .attr("d", d => {
            const o = {x: source.x0, y: source.y0};
            return diagonal({source: o, target: o});
          });

      link.merge(linkEnter).transition()
          .duration(duration)
          .attr("d", diagonal);

      link.exit().transition()
          .duration(duration)
          .remove()
          .attr("d", d => {
            const o = {x: source.x, y: source.y};
            return diagonal({source: o, target: o});
          });

      // Stash the old positions for transition.
      root.eachBefore(d => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    };

    // Initial setup
    root.x0 = dy / 2;
    root.y0 = 0;
    root.descendants().forEach((d, i) => {
      d.id = i;
      d._children = d.children;
      if (d.depth && d.data.name.length !== 7) d.children = null;
    });

    update(null, root);

  }, [data, dimensions, margin]);

  return (
    <div style={{ maxWidth: '100%', height: '100vh', padding: '20px', background: '#ccc', position: 'relative', overflow: 'auto' }}> {/* Added overflow: auto */}
      <svg style={{ position: 'relative', width: '100%', height: '100%', minHeight: '800px' }} ref={svgRef}></svg> {/* Set minHeight for SVG */}
    </div>
  );
};

export default TreeGraph;
