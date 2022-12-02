"use strict";
//jshint esversion:7

// require("dotenv").config();
const express = require("express");
// const bodyParser = require("body-parser");
// const _ = require("lodash");
// const mongoose = require("mongoose");
// const {
//   PassportLocalSchema
// } = require('mongoose');
// const session = require("express-session");
// const passport = require("passport");
// const passportLocalMongoose = require("passport-local-mongoose");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const findOrCreate = require("mongoose-findorcreate");
const fs = require("fs");
const path = require("path");
const app = express();
// const cookieParser = require("cookie-parser");
const cors = require("cors");
// const axios = require("axios")
// app.use(cookieParser())



// mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xjjka.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`).then(() => {
//   console.log('connected to cluster : ' + process.env.DB_NAME)
// }).catch((err) => {
//   console.log(err + ' : error connecting to cluster')
// });


app.use(cors())


app.use(express.static(path.join(__dirname, 'public')))
app.set("view engine", "ejs");
// app.use(bodyParser.json());
// app.use(
//     bodyParser.urlencoded({
//         extended: true,
//     })
// );



app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// const Models = require('./database/models.js');


// const routes = require("./routes/routes");


// app.use("/app", routes)

// app.use("/", (req, res) => {
//   res.redirect("/app/home")
// });


app.get("/help",async(req,res)=>{
    const msg = `
    1) Define deutsh algorithm for oracular function \n
    2) Demonstrate quantable teleportation \n
    3) Demonstrate grovers algorithm \n
    4) write program to generate the state \n
    5) wap to find density matrix \n
    6) wap to find partial trace and then find entanglment entropy \n
    7) find decomposition of swap gate \n
    8) consider the circuit\n
    `
    res.send(msg);
})

app.get("/1",async(req,res)=>{
    const msg = `
import numpy as np
# Importing standard Qiskit libraries
from qiskit import QuantumCircuit, transpile, Aer, IBMQ, QuantumRegister,
ClassicalRegister, execute, BasicAer
from qiskit.tools.jupyter import *
from qiskit.visualization import *
from ibm_quantum_widgets import *
from qiskit.providers.aer import QasmSimulator
# Loading your IBM Quantum account(s)
provider = IBMQ.load_account()
# In[54]:
backend = BasicAer.get_backend('qasm_simulator')
shots=1024
# In[42]:
qreg1 = QuantumRegister(2) # The quantum register of the qubits, in this case
2 qubits
register1 = ClassicalRegister(1)
# In[43]:
qc = QuantumCircuit(qreg1, register1)
qc.x(1)
qc.barrier()
qc.h([0,1])
qc.barrier()
qc.draw()
# In[44]:
qc.cx(0,1)
qc.barrier()
qc.draw()
# In[45]:
qc.h(0)
qc.draw()
# In[46]:
qc.measure(qreg1[0],register1)
qc.draw()
# In[55]:
results = execute(qc, backend=backend, shots=shots).result()
answer = results.get_counts()
plot_histogram(answer)`
res.send(msg)
})

app.get("/2",async(req,res)=>{
    const msg = `
'''
    Quantum Teleportation
    Task. Alice would like to send Bob a qubit that is in some unknown state.
'''
from qiskit import IBMQ, BasicAer
from qiskit import QuantumCircuit, ClassicalRegister, QuantumRegister, execute

qr = QuantumRegister(3)  # Initialize qubits
cr0 = ClassicalRegister(1)
cr1 = ClassicalRegister(1)
cr2 = ClassicalRegister(1)
circuit = QuantumCircuit(qr, cr0, cr1, cr2)

# Prepare the initial state which we want to transfer
circuit.x(qr[0])

# Prepare the Bell pair
circuit.h(qr[1])
circuit.cx(qr[1], qr[2])

circuit.barrier()

# Measure in the Bell basis
circuit.cx(qr[0], qr[1])
circuit.h(qr[0])
circuit.measure(qr[0], cr0[0])
circuit.measure(qr[1], cr1[0])

circuit.barrier()

# Apply a correction
circuit.z(qr[2]).c_if(cr0, 1)
circuit.x(qr[2]).c_if(cr1, 1)
circuit.measure(qr[2], cr2[0])

# Run our circuit with local simulator
backend = BasicAer.get_backend('qasm_simulator')
shots = 1024
results = execute(circuit, backend=backend, shots=shots).result()
answer = results.get_counts()
print(answer)`
res.send(msg)
})

app.get("/3",async(req,res)=>{
    const msg = `
    import numpy as np
    # Importing standard Qiskit libraries
    from qiskit import QuantumCircuit, transpile, Aer, IBMQ
    from qiskit.tools.jupyter import *
    from qiskit.visualization import *
    from ibm_quantum_widgets import *
    from qiskit.providers.aer import QasmSimulator
    # Loading your IBM Quantum account(s)
    provider = IBMQ.load_account()
    # In[5]:
    #initialization
    import matplotlib.pyplot as plt
    import numpy as np
    # importing Qiskit
    from qiskit import IBMQ, Aer, assemble, transpile
    from qiskit import QuantumCircuit, ClassicalRegister, QuantumRegister
    from qiskit.providers.ibmq import least_busy
    # import basic plot tools
    from qiskit.visualization import plot_histogram
    # In[ ]:
    def initialize_s(qc, qubits):
        """Apply a H-gate to 'qubits' in qc"""
        for q in qubits:
        qc.h(q)
        return qc
    # In[316]:
    n = 2
    grover_circuit = QuantumCircuit(n)
    grover_circuit = initialize_s(grover_circuit, [0,1])
    grover_circuit.draw()
    grover_circuit.cz(0,1) # Oracle
    grover_circuit.draw()
    # In[317]:
    # Diffusion operator (U_s)
    grover_circuit.h([0,1])
    grover_circuit.x([1])
    grover_circuit.cz(1,0)
    grover_circuit.h([0,1])
    grover_circuit.draw()
    # In[318]:
    sim = Aer.get_backend('aer_simulator')
    # we need to make a copy of the circuit with the 'save_statevector'
    # instruction to run on the Aer simulator
    grover_circuit_sim = grover_circuit.copy()
    grover_circuit_sim.save_statevector()
    qobj = assemble(grover_circuit_sim)
    result = sim.run(qobj).result()
    statevec = result.get_statevector()
    from qiskit_textbook.tools import vector2latex
    vector2latex(statevec, pretext="|\\psi\\rangle =")
    # In[319]:
    grover_circuit.measure_all()
    aer_sim = Aer.get_backend('aer_simulator')
    qobj = assemble(grover_circuit)
    result = aer_sim.run(qobj).result()
    counts = result.get_counts()
    plot_histogram(counts)
    # In[320]:
    # Load IBM Q account and get the least busy backend device
    provider = IBMQ.load_account()
    provider = IBMQ.get_provider("ibm-q")
    device = least_busy(provider.backends(filters=lambda x:
    int(x.configuration().n_qubits) >= 3 and
    not x.configuration().simulator and
    x.status().operational==True))
    print("Running on current least busy device: ", device)
    # In[321]:
    # Run our circuit on the least busy backend. Monitor the execution of the job
    in the queue
    from qiskit.tools.monitor import job_monitor
    transpiled_grover_circuit = transpile(grover_circuit, device,
    optimization_level=3)
    job = device.run(transpiled_grover_circuit)
    job_monitor(job, interval=2)
    # In[322]:
    # Get the results from the computation
    results = job.result()
    answer = results.get_counts(grover_circuit)
    plot_histogram(answer)
    `
res.send(msg)
})

app.get("/4",async(req,res)=>{
    const msg = 
    `
import numpy as np
#Importing standard Qiskit Libraries
from giskit import QuantumCircuit, transpile, Aer, IBMQ, execute
from qiskit.tools.jupyter import *
from giskit.visualization import *
from ibm_quantum_widgets import *
from giskit.providers.aer import QasmSimulator
# Loading your IBM Quantum account(s)
provider = IBMQ.load_account()
qc1=QuantumCircuit(2, 2)
qc1.h(1)
qc1.cx(0,1)
qc1.cx(1,0)
qci.draw()
from giskit.quantum_info import Statevector
state=Statevector.from_int(1,4)
state=state.evolve(qc1)
state.draw('latex')
    `

res.send(msg)
})

app.get("/5",async(req,res)=>{
    const msg = 
    `
    qc=QuantumCircuit (2,2)
    from qiskit.quantum_info import Statevector
    state=Statevector.from_int(1,4)
    state=state.evolve(qc)
    state.draw(‘latex')
    qc=QuantumCircuit (2,2)
    #qc.h(1)
    qc.cx(0,1)
    qc.h(1)
    qc.cx(1,0)
    qc.draw()
    from giskit.quantum_info import Statevector,DensityMatrix
    state=Statevector.from_int(1,4)
    state=state.evolve(qc)
    state.draw(‘latex’)
    import giskit.quantum_info as qi
    rho_AB = qi.DensityMatrix.from_instruction(qc)
    rho_AB.draw(‘latex', prefix="\\rho_{AB}= ‘)
    
    `

res.send(msg)
})

app.get("/6",async(req,res)=>{
    const msg = 
    `
    from giskit import QuantumCircuit, QuantumRegister
    from giskit.quantum_info import DensityMatrix,partialtrace
    import numpy as np
    qr=QuantumRegister(2)
    circ=QuantumCircuit (qr)
    circ.h(qr[0])
    circ.cx(qr[0],qr[1])
    DM=DensityMatrix.from_instruction(circ)
    print(DM.data)
    PT=partialtrace(DM,[0])
    print(PT.data)
    
    `

res.send(msg)
})

app.get("/7",async(req,res)=>{
    const msg = 
    `
    # Importing standard Qiskit Libraries
    from giskit import QuantumCircuit, transpile, Aer, IBMQ
    from giskit.tools.jupyter import *
    from qiskit.visualization import *
    from ibmquantumwidgets import *
    from giskit.providers.aer import QasmSimulator
    from qiskit.quantum_info import *
    from giskit.visualization import plotstatecity
    # Loading your IBM Quantum account(s)
    import numpy as np
    provider = IBMQ.load_account()
    qc = QuantumCircuit(2)
    # swaps states of qubits a and b
    qc.swap(0,1)
    qc.draw()
    
    `

res.send(msg)
})

app.get("/8",async(req,res)=>{
    const msg = 
    `
import numpy as np# Importing standard Qiskit Libraries
from giskit import QuantumCircuit, transpile, Aer, IBMQ
from gqiskit.tools.jupyter import *
from giskit.visualization import *
from ibmquantumwidgets import *
from giskit.providers.aer import QasmSimulator
provider = IBMQ.load_account()
qc = QuantumCircuit(4,2)
# encode inputs in qubits 0 and 1
qc.x(0)
qc.x(1)
# use cnots to write the XOR of the inputs on qubit 2
qc.cx(0,2)
qc.cx(1,2)
# use ccx to write the AND of the inputs on qubit 3
qc.ccx(0,1,3)# extract outputs
qc.measure(2,0) # extract XOR value
qc.measure(3,1) # extract AND value
qc.draw(output='mp1')
    
    `

res.send(msg)
})


const port = process.env.PORT || 8000;
app.listen(port, async (req, res) => {
    console.log("server is running on port http://localhost:" + port);
});