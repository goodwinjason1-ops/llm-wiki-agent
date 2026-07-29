# QTF Statistical Validation Gates - Implementation Contract
**Status:** IN_PROGRESS  
**Created:** 2026-07-14  
**Last Updated:** 2026-07-14 11:42  

## Contract Scope

### 1. Rule Significance Test (RST)
- **Purpose:** Validate strategy entry rules have genuine edge vs random noise
- **Method:** Run t-test comparing actual returns vs N random baselines
- **Acceptance Criteria:** p-value < 0.05 required for strategy promotion
- **Implementation:** `statistical_gates/__init__.py` ✓ COMPLETE

### 2. Monte Carlo Overfitting Test
- **Purpose:** Detect if strategy is overfit to historical trade sequence
- **Method:** Shuffle trade sequence N times, calculate metric percentiles
- **Acceptance Criteria:** 50th-75th percentile = robust strategy
- **Implementation:** `statistical_gates/monte_carlo.py` ✓ COMPLETE

### 3. Integration Gates
- **QTF-001 Entry Gate:** Must pass RST before live trading
- **QTF-002 Robustness Gate:** Must pass Monte Carlo (50-75th percentile)
- **QTF-003 Out-of-Sample Gate:** Must validate on unseen data

## Integration Tasks

### P0: Integration Layer
- [ ] Create `statistical_gates/gate_runner.py` - orchestrates RST + Monte Carlo
- [ ] Add gate checks to `strategy_lab_v3.py` promotion workflow
- [ ] Create gate result JSON schema for logging
- [ ] Add gate status to QTF dashboard

### P1: Strategy Lab Integration
- [ ] Modify `strategy_lab_v3.py` to accept gate functions
- [ ] Add `--run-gates` flag to strategy execution
- [ ] Create gate failure handling (block promotion if gates fail)
- [ ] Add gate results to strategy metadata

### P2: Dashboard Visualization
- [ ] Add gate status indicators to dashboard
- [ ] Display RST p-values and Monte Carlo percentiles
- [ ] Color-code: PASS (green), FAIL (red), PENDING (yellow)
- [ ] Add gate history for strategy evolution tracking

### P3: Out-of-Sample Validation
- [ ] Create holdout dataset splitter (80/20 train/test)
- [ ] Implement out-of-sample validation runner
- [ ] Add cross-validation support for robust validation
- [ ] Create OOS performance delta calculator

## Next Steps

1. **Create `gate_runner.py`** - Orchestration module that runs both gates
2. **Test on dummy strategy** - Verify gates work with sample data
3. **Integrate with strategy_lab** - Add gate checks to promotion workflow
4. **Update dashboard** - Visualize gate results

## Dependencies

- Existing strategies in `strategy_lab_v3.py`
- Historical data in `data_cache/`
- QTF dashboard infrastructure
- Promotion workflow definitions

## Success Criteria

- [x] RST implementation complete
- [x] Monte Carlo implementation complete
- [ ] Gate runner orchestrates both tests
- [ ] Gates integrated into strategy promotion
- [ ] Dashboard displays gate status
- [ ] Out-of-sample validation working
- [ ] Documentation complete
