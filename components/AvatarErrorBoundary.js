"use client";
import { Component } from "react";

// If the .glb fails to load (e.g. file not added yet), fall back gracefully
// instead of crashing the whole page.
export default class AvatarErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(err) {
    console.warn("Avatar GLB failed to load, using fallback character:", err?.message);
  }
  render() {
    if (this.state.failed) return this.props.fallback;
    return this.props.children;
  }
}
