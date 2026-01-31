if (!window.React || !window.ReactDOM) {
    throw new Error("React or ReactDOM library failed to load.");
}
const { useState, useEffect } = window.React;
const { createRoot } = window.ReactDOM;
// Check if Recharts is loaded
if (!window.Recharts) {
    throw new Error("Recharts library failed to load. Please check your internet connection or try refreshing.");
}
const { AreaChart, Area, BarChart, Bar, Line, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = window.Recharts;
const { motion } = window.Motion ? window.Motion : { motion: { div: 'div' } }; // Fallback if Motion fails

// --- Icons (Inline SVGs to remove dependency complexity) ---
const FiSearch = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
const FiMoon = ({ size }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
);
const FiSettings = ({ size }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
);
const FiBell = ({ size }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
);
const FiChevronDown = ({ size }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
);


// --- Components ---

// Dashboard Component
const Dashboard = ({ onNavigate }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [tableSearch, setTableSearch] = useState('');

    const trafficData = [
        { month: 'Jan', value: 2000 }, { month: 'Feb', value: 2200 }, { month: 'Mar', value: 2100 },
        { month: 'Apr', value: 2456 }, { month: 'May', value: 2300 }, { month: 'Jun', value: 2400 },
        { month: 'Jul', value: 2350 }, { month: 'Aug', value: 2500 }, { month: 'Sep', value: 2600 },
        { month: 'Oct', value: 2450 }, { month: 'Nov', value: 2550 }, { month: 'Dec', value: 2700 },
    ];

    const portsData = [
        { port: '28', value: 400 }, { port: '32', value: 300 }, { port: '36', value: 200 },
        { port: '42', value: 278 }, { port: '56', value: 190 }, { port: '68', value: 239 },
        { port: '72', value: 221 }, { port: '85', value: 250 }, { port: '92', value: 210 },
    ];

    const devicesData = [
        { id: 1, assetName: 'DNS: ISC Bind RPZ Rule Process…', severity: 'Minor', status: '118 Alerts / 225 Alerts', lastActive: '2025-01-12 / 2025-01-22', detected: '2025-02-12 / 2025-02-19', assets: '235 / 356' },
        { id: 2, assetName: 'DNS: ISC Bind RPZ Rule Process…', severity: 'Minor', status: '118 Alerts / 225 Alerts', lastActive: '2025-01-12 / 2025-01-22', detected: '2025-02-12 / 2025-02-19', assets: '235 / 356' },
        { id: 3, assetName: 'DNS: ISC Bind RPZ Rule Process…', severity: 'Minor', status: '118 Alerts / 225 Alerts', lastActive: '2025-01-12 / 2025-01-22', detected: '2025-02-12 / 2025-02-19', assets: '235 / 356' },
        { id: 4, assetName: 'DNS: ISC Bind RPZ Rule Process…', severity: 'Minor', status: '118 Alerts / 225 Alerts', lastActive: '2025-01-12 / 2025-01-22', detected: '2025-02-12 / 2025-02-19', assets: '235 / 356' },
    ];

    const StatCard = ({ title, value, change }) => {
        const isPositive = change.startsWith('+');
        return (
            <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 backdrop-blur-md border border-slate-700/50 shadow-lg">
                <p className="text-slate-400 text-sm font-medium mb-2">{title}</p>
                <p className="text-3xl font-bold text-white mb-2">{value}</p>
                <p className={`text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>{change}</p>
            </motion.div>
        );
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-slate-900 border border-slate-700 rounded p-3 text-white text-sm">
                    <p className="font-semibold">${payload[0].value}</p>
                    <p className="text-green-400">+3.45% (+0.058)</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-10">
            {/* NAVBAR */}
            <nav className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b border-slate-700/50">
                <div className="flex items-center gap-8">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 flex items-center justify-center cursor-pointer" onClick={() => onNavigate('dashboard')}>
                        <span className="text-white font-bold text-lg">X</span>
                    </div>
                    <div className="relative hidden lg:block">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="text" placeholder="Search here..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-sm text-white focus:outline-none focus:border-slate-500 w-64 transition-all" />
                    </div>
                    <div className="hidden lg:flex gap-8">
                        {['Dashboard', 'Visibility', 'Network', 'Assets'].map((item) => (
                            <button key={item} onClick={() => onNavigate(item.toLowerCase())} className={`text-sm font-medium transition-colors ${item === 'Dashboard' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400 hover:text-white'}`}>
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex gap-4">
                        <button className="text-slate-400 hover:text-white"><FiMoon size={20} /></button>
                        <button className="text-slate-400 hover:text-white"><FiSettings size={20} /></button>
                        <button className="text-slate-400 hover:text-white"><FiBell size={20} /></button>
                    </div>
                    <div className="flex items-center gap-3 pl-6 border-l border-slate-700">
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-medium text-white">Alex Rock</p>
                            <p className="text-xs text-slate-400">Product Designer</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border border-slate-600"></div>
                    </div>
                </div>
            </nav>

            <main className="p-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[
                        { name: 'Network Analytics', icon: '🌐', desc: 'Real-time network monitoring', page: 'network', from: 'from-indigo-600', to: 'to-indigo-800', border: 'border-indigo-500/30' },
                        { name: 'Visibility Platform', icon: '👁️', desc: 'Infrastructure insights', page: 'visibility', from: 'from-pink-600', to: 'to-purple-800', border: 'border-pink-500/30' },
                        { name: 'Asset Management', icon: '💼', desc: 'Inventory tracking', page: 'assets', from: 'from-emerald-600', to: 'to-green-800', border: 'border-emerald-500/30' }
                    ].map((card) => (
                        <motion.div key={card.name} whileHover={{ scale: 1.05 }} onClick={() => onNavigate(card.page)} className={`cursor-pointer bg-gradient-to-br ${card.from} ${card.to} rounded-lg p-8 backdrop-blur-md border ${card.border} hover:shadow-2xl`}>
                            <div className="flex flex-col items-center gap-4 text-center">
                                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-3xl mb-2">{card.icon}</div>
                                <h3 className="text-xl font-bold text-white">{card.name}</h3>
                                <p className="text-sm text-white/70">{card.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard title="Domain Controller" value="12,585" change="+0.30%" />
                    <StatCard title="NTP Server" value="12,585" change="-0.44%" />
                    <StatCard title="Web Server" value="12,585" change="+0.70%" />
                    <StatCard title="Other" value="12,585" change="-0.69%" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 backdrop-blur-md border border-slate-700/50">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-white">Traffic Overview</h2>
                            <button className="flex items-center gap-2 px-3 py-1 bg-slate-700/50 rounded-lg text-sm text-white">Weekly <FiChevronDown /></button>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={trafficData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="month" stroke="#94a3b8" />
                                <YAxis stroke="#94a3b8" />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorValue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 backdrop-blur-md border border-slate-700/50">
                        <h2 className="text-lg font-semibold text-white mb-6">Top Active Ports</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <ComposedChart data={portsData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="port" stroke="#94a3b8" />
                                <YAxis stroke="#94a3b8" />
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                                <Bar dataKey="value" fill="#6366f1" opacity={0.8} />
                                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 backdrop-blur-md border border-slate-700/50">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
                        <h2 className="text-lg font-semibold text-white">2163 Active Devices</h2>
                        <div className="relative w-full md:w-auto">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input type="text" placeholder="Search identities" value={tableSearch} onChange={(e) => setTableSearch(e.target.value)} className="w-full md:w-64 pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-sm text-white focus:outline-none" />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-700">
                                    {['Asset Name', 'Severity', 'Status', 'Last Active', 'Time Detected', 'Assets', 'Action'].map(h => (
                                        <th key={h} className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase whitespace-nowrap">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {devicesData.map((device) => (
                                    <tr key={device.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                                        <td className="px-4 py-4 text-sm text-slate-300">{device.assetName}</td>
                                        <td className="px-4 py-4 text-sm"><span className="px-2 py-1 rounded bg-yellow-500/20 text-yellow-400">{device.severity}</span></td>
                                        <td className="px-4 py-4 text-sm text-slate-300">{device.status}</td>
                                        <td className="px-4 py-4 text-sm text-slate-300">{device.lastActive}</td>
                                        <td className="px-4 py-4 text-sm text-slate-300">{device.detected}</td>
                                        <td className="px-4 py-4 text-sm text-slate-300">{device.assets}</td>
                                        <td className="px-4 py-4 text-sm"><button className="px-3 py-1 rounded bg-slate-700/50 border border-slate-600 hover:bg-slate-700 transition">View</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

// Network Page Component
const Network = ({ onNavigate }) => {
    return (
        <div className="min-h-screen bg-network text-slate-200 relative overflow-hidden font-sans">
            <div className="particle-bg-layer"></div>
            <header className="flex justify-between items-center px-10 py-6 glass sticky top-0 z-50">
                <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 cursor-pointer" onClick={() => onNavigate('dashboard')}>🌐 NetworkPro</div>
                <nav className="hidden md:flex gap-8">
                    <a href="#" className="text-slate-300 hover:text-indigo-400 transition">Overview</a>
                    <a href="#" className="text-slate-300 hover:text-indigo-400 transition">Nodes</a>
                    <a href="#" className="text-slate-300 hover:text-indigo-400 transition">Analytics</a>
                </nav>
                <button className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full text-white font-semibold shadow-lg hover:-translate-y-0.5 transition" onClick={() => onNavigate('dashboard')}>← Back</button>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-10">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500">Network Analytics Dashboard</h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">Real-time monitoring and analysis of your network infrastructure with advanced insights.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {[
                        { icon: '📊', val: '1,245', label: 'Active Devices' },
                        { icon: '⚡', val: '99.8%', label: 'Uptime' },
                        { icon: '🔄', val: '5.2 Gbps', label: 'Throughput' },
                        { icon: '🛡️', val: '28', label: 'Threats Blocked' }
                    ].map((stat, i) => (
                        <div key={i} className="glass rounded-2xl p-8 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 border border-indigo-500/30">
                            <div className="text-4xl mb-4">{stat.icon}</div>
                            <div className="text-3xl font-bold text-white mb-2">{stat.val}</div>
                            <div className="text-sm font-semibold text-slate-400">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="glass rounded-3xl p-10 mb-16 border border-indigo-500/20">
                    <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Network Topology</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {['Server 1', 'Server 2', 'Database', 'Router', 'Firewall', 'Cloud'].map((node, i) => (
                            <div key={i} className="h-40 glass rounded-2xl border border-indigo-500/40 flex flex-col items-center justify-center cursor-pointer hover:scale-110 hover:border-pink-500 transition-all duration-300">
                                <div className="text-3xl mb-3">{'🖥️🖥️💾🔌📡☁️'[i * 2]}{'🖥️🖥️💾🔌📡☁️'[i * 2 + 1]}</div>
                                <div className="font-semibold text-slate-300">{node}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

// Visibility Page Component
const Visibility = ({ onNavigate }) => {
    return (
        <div className="min-h-screen bg-visibility text-slate-200 relative overflow-hidden">
            <header className="flex justify-between items-center px-10 py-6 glass sticky top-0 z-50 border-b border-pink-500/30">
                <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-cyan-500 cursor-pointer" onClick={() => onNavigate('dashboard')}>👁️ VisibilityHub</div>
                <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white font-semibold shadow-lg hover:-translate-y-0.5 transition" onClick={() => onNavigate('dashboard')}>← Back</button>
            </header>
            <main className="max-w-7xl mx-auto px-6 py-10 text-center">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mb-16">
                    <h1 className="text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">Complete Visibility Platform</h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto">Gain comprehensive insights into your infrastructure with real-time monitoring.</p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {[
                        { title: 'Deep Insights', icon: '🔍', desc: 'Uncover hidden patterns with AI.' },
                        { title: 'Real-time', icon: '📊', desc: 'Sub-second latency updates.' },
                        { title: 'Predictive', icon: '🎯', desc: 'Forecast future trends.' },
                        { title: 'Compliance', icon: '🛡️', desc: 'Meet regulatory requirements.' },
                        { title: 'Optimization', icon: '⚡', desc: 'Identify bottlenecks.' },
                        { title: 'Integration', icon: '🔄', desc: 'Connect 500+ tools.' }
                    ].map((f, i) => (
                        <motion.div key={i} whileHover={{ y: -10 }} className="glass rounded-3xl p-8 border border-pink-500/30 text-left hover:border-cyan-400 transition duration-300">
                            <div className="text-5xl mb-4 animate-float">{f.icon}</div>
                            <h3 className="text-2xl font-bold text-white mb-2">{f.title}</h3>
                            <p className="text-slate-400">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
};

// Assets Page Component
const Assets = ({ onNavigate }) => {
    return (
        <div className="min-h-screen bg-assets text-slate-200 relative overflow-hidden">
            <div className="mesh-bg"></div>
            <header className="flex justify-between items-center px-10 py-6 glass sticky top-0 z-50 border-b border-emerald-500/30">
                <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 cursor-pointer" onClick={() => onNavigate('dashboard')}>💼 AssetHub</div>
                <button className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full text-white font-semibold shadow-lg hover:-translate-y-0.5 transition" onClick={() => onNavigate('dashboard')}>← Back</button>
            </header>
            <main className="max-w-7xl mx-auto px-6 py-10">
                <div className="text-center mb-16">
                    <h1 className="text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500">Asset Management System</h1>
                    <p className="text-xl text-slate-400">Comprehensive lifecycle management.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {[
                        { title: 'Servers', icon: '💻', status: 'Active', health: '98%', count: '124' },
                        { title: 'Devices', icon: '📱', status: 'Active', health: '95%', count: '856' },
                        { title: 'Storage', icon: '💾', status: 'Maintenance', health: '78%', count: '45TB', warn: true }
                    ].map((asset, i) => (
                        <motion.div key={i} whileHover={{ y: -10 }} className="glass rounded-3xl p-8 border border-emerald-500/30 relative overflow-hidden">
                            <div className="flex justify-between items-start mb-6">
                                <div className="text-4xl">{asset.icon}</div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${asset.warn ? 'bg-amber-500/20 text-amber-500' : 'bg-emerald-500/20 text-emerald-400'}`}>{asset.status}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">{asset.title}</h3>
                            <div className="space-y-3 text-sm text-slate-300">
                                <div className="flex justify-between"><span>Count</span><span className="text-white font-mono">{asset.count}</span></div>
                                <div className="flex justify-between"><span>Health</span><span className="text-white font-mono">{asset.health}</span></div>
                                <div className="h-2 bg-slate-700 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: asset.health }}></div></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
};

// Main App Router
const App = () => {
    const [route, setRoute] = useState('dashboard');
    useEffect(() => { window.scrollTo(0, 0); }, [route]);
    switch (route) {
        case 'dashboard': return <Dashboard onNavigate={setRoute} />;
        case 'network': return <Network onNavigate={setRoute} />;
        case 'visibility': return <Visibility onNavigate={setRoute} />;
        case 'assets': return <Assets onNavigate={setRoute} />;
        default: return <Dashboard onNavigate={setRoute} />;
    }
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);
