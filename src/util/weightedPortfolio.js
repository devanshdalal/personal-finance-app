export const getBasketPortfolio = (schemes = [], funds) => {
  let portfolioMap = {};
  let portfolioSectorMap = {};
  let totalWt = 0;
  // console.log('schemes', schemes);
  schemes.forEach((v) => {
    if (!funds.hasOwnProperty(v.name)) {
      return;
    }
    const f = funds[v.name];
    const wt = v.wt;
    totalWt += wt;
    f.portfolio.map((c) => {
      if (!portfolioMap.hasOwnProperty(c.stock)) {
        portfolioMap[c.stock] = 0;
        portfolioSectorMap[c.stock] = c.sector
      }
      portfolioMap[c.stock] += wt * c.wt;
    });
  });
  let portfolio = [];
  Object.keys(portfolioMap).forEach(key => {
    const wt = portfolioMap[key] / totalWt;
    portfolio.push({ stock: key, wt: wt.toFixed(3), raw_wt: wt, sector: portfolioSectorMap[key]});
  });
  let sectorWeight = {}
  let totalWeight = 0;
  portfolio.forEach(
    p => {
      if (p.sector in sectorWeight) {
        sectorWeight[p.sector] += p.raw_wt
      } else {
        sectorWeight[p.sector] = p.raw_wt
      }
      totalWeight += p.raw_wt;
    }
  )
  const sectorDist = Object.keys(sectorWeight).map((k) => 
    {
      return {
        "wt": (sectorWeight[k]/totalWeight).toFixed(3),
        "sector": k
      }
    }
  ).sort((a, b) => b.wt - a.wt).slice(0,5);
  return {
    overview: portfolio.sort((a, b) => b.wt - a.wt).slice(0,10),
    sectorDist
  };
};

