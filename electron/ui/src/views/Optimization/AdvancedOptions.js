export const advancedOptions = {
    scale_model: {
        displayName: "Scale Model",
        defaultValue: true,
        options: {
            "No": false,
            "Yes": true
        }
    },
    pipeline_capacity: {
        displayName: "Pipeline Capacity",
        defaultValue: "input",
        options: {
            "Calculated": "calculated",
            "Input": "input"
        }
    },
    pipeline_cost: {
        displayName: "Pipeline Capacity",
        defaultValue: "distance_based",
        options: {
            "Distance Based": "distance_based",
            "Capacity Based": "capacity_based"
        }
    },
    node_capacity: {
        displayName: "Node Capacity",
        defaultValue: true,
        options: {
            "No": false,
            "Yes": true
        }
    },
    infrastructure_timing: {
        displayName: "Infrastructure Timing",
        defaultValue: "false",
        options: {
            "False": "false",
            "True": "true"
        }
    },
    subsurface_risk: {
        displayName: "Subsurface Risk",
        defaultValue: "false",
        options: {
            "False": "false",
            "Exclude Over/Under PW": "exclude_over_and_under_pressured_wells",
            "Calculate Risk Metrics": "calculate_risk_metrics"

        }
    },
    removal_efficiency_method: {
        displayName: "Removal Efficiency Method",
        defaultValue: "concentration_based",
        options: {
            "Load Based": "load_based",
            "Concentration Based": "concentration_based"
        }
    },
    desalination_model: {
        displayName: "Desalination Model",
        defaultValue: "false",
        options: {
            "False": "false",
            "MVC": "mvc",
            "MD": "md"
        },
    },
  }