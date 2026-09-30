export function createDriveAccess({ roots, listChildren, ttl = 300000, maxFolders = 200 }) {
  let state;
  function current() {
    if (!state || (!state.pending && Date.now() >= state.until)) {
      state = { until: Date.now() + ttl, allowed: new Map(roots.map(id => [id, null])), queue: [...roots], visited: new Set(), pending: null };
    }
    return state;
  }
  function remember(graph, children) {
    for (const child of children) {
      if (graph.allowed.has(child.id)) continue;
      graph.allowed.set(child.id, child);
      if (child.mimeType === "application/vnd.google-apps.folder") graph.queue.push(child.id);
    }
  }
  const authorize = async id => {
    const graph = current();
    while (!graph.allowed.has(id)) {
      if (graph.pending) { await graph.pending; continue; }
      if (!graph.queue.length) throw Object.assign(new Error("Material is outside the public study folders"), { status: 403 });
      if (graph.visited.size >= maxFolders) throw Object.assign(new Error("Study folder discovery limit reached"), { status: 503 });
      graph.pending = (async () => {
        const folder = graph.queue[0];
        let children;
        try { children = await listChildren(folder); }
        catch (error) {
          if (![403, 404].includes(Number(error.code))) throw error;
          children = [];
        }
        graph.queue.shift();
        graph.visited.add(folder);
        remember(graph, children);
      })().finally(() => { graph.pending = null; });
      await graph.pending;
    }
    return graph.allowed.get(id);
  };
  authorize.rememberChildren = (parentId, children) => {
    const graph = current();
    if (!graph.allowed.has(parentId)) return false;
    remember(graph, children);
    return true;
  };
  return authorize;
}
