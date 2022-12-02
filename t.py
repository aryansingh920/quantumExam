from qiskit.providers.aer import QasmSimulator
from ibm_quantum_widgets import *
from qiskit.visualization import *
from qiskit.tools.jupyter import *
import numpy as np
# Importing standard Qiskit libraries
from qiskit import QuantumCircuit, transpile, Aer, IBMQ, QuantumRegister,
ClassicalRegister, execute, BasicAer
# Loading your IBM Quantum account(s)
provider = IBMQ.load_account()
# In[54]:
backend = BasicAer.get_backend('qasm_simulator')
shots = 1024
# In[42]:
# The quantum register of the qubits, in this case 2 qubits
qreg1 = QuantumRegister(2)
register1 = ClassicalRegister(1)
# In[43]:
qc = QuantumCircuit(qreg1, register1)
qc.x(1)
qc.barrier()
qc.h([0, 1])
qc.barrier()
qc.draw()
# In[44]:
qc.cx(0, 1)
qc.barrier()
qc.draw()
# In[45]:
qc.h(0)
qc.draw()
# In[46]:
qc.measure(qreg1[0], register1)
qc.draw()
# In[55]:
results = execute(qc, backend=backend, shots=shots).result()
answer = results.get_counts()
plot_histogram(answer)
