## Pedagogy
<p align="center">

<br>
<b> Experiment : Roofline Performance Model Analysis	 <a name="top"></a> <br>
</p>

<b>Discipline | Computer Science and Engineering <b> 
:--|:--|
<b> Lab | Computer Architecture and Organization Lab<b> 
<b> Experiment|  Roofline Performance Model Analysis   <b> 


<h4> [1. Focus Area](#LO)
<h4> [2. Learning Objectives ](#LO)
<h4> [3. Instructional Strategy](#IS)
<h4> [4. Task & Assessment Questions](#AQ)
<h4> [5. Simulator Interactions](#SI)
<hr>

<a name="LO"></a>
#### 1. Focus Area : Reinforce theoretical concept and provide hands-on experience with performance analysis.

#### 2. Learning Objectives and Cognitive Level

Sr. No |	Learning Objective	| Cognitive Level | Action Verb
:--|:--|:--|:-:
1.| Students will be able to construct roofline performance models for different computer architectures <br>   | Apply   |  Construct 
2.| Students will be able to analyze computational bottlenecks using operational intensity calculations <br>   | Analyze   |  Analyze  
3.| Students will be able to develop optimization strategies based on roofline analysis <br>   | Evaluate   |  Develop  
4.| Students will be able to compare performance characteristics across different processor architectures <br>   | Evaluate   |  Compare
5.| Students will be able to identify memory-bound vs compute-bound application regions <br>   | Apply   |  Identify
6.| Students will be able to interpret ridge points and their implications for performance optimization <br>   | Understand   |  Interpret

<br/>
<div align="right">
    <b><a href="#top">↥ back to top</a></b>
</div>
<br/>
<hr>

<a name="IS"></a>
#### 3. Instructional Strategy
###### Name of Instructional Strategy  :    <u> Interactive Simulation with Guided Discovery <u>   
###### Assessment Method: Pre-test, Hands-on Simulation Tasks, Post-test   

<u> <b>Description: </b> Students begin with a pretest to assess prerequisite knowledge of computer architecture and performance concepts. They then engage with an interactive roofline simulator that allows real-time manipulation of architecture parameters and application plotting. Through guided procedures, students explore different scenarios including memory-bound and compute-bound applications across various processor architectures (Apple Silicon, Intel Xeon, NVIDIA GPU). The simulation provides immediate visual feedback and analysis suggestions, enabling students to develop intuitive understanding of performance optimization principles. A comprehensive posttest evaluates learning outcomes and practical application of roofline analysis concepts. </u>
<br>
    

<br/>
<div align="right">
    <b><a href="#top">↥ back to top</a></b>
</div>
<br/>
<hr>

<a name="AQ"></a>
#### 4. Task & Assessment Questions:

<br>

Sr. No |	Learning Objective	| Task to be performed by <br> the student  in the simulator | Assessment Questions as per LO & Task
:--|:--|:--|:-:
1.| Construct roofline performance models <br>  | Select different architectures and observe roofline construction with varying memory bandwidth and compute capabilities <br>  | What is the ridge point for a system with 100 GB/s memory bandwidth and 10 TFLOP/s peak performance? <br> 
2.| Analyze computational bottlenecks <br>  | Plot applications with different operational intensities and identify bottleneck regions <br>  | For an application with operational intensity of 0.5 FLOP/byte on a system with ridge point 2.0, what is the primary bottleneck? <br> 
3.| Develop optimization strategies <br>  | Use the analysis panel to explore optimization suggestions for different application types <br>  | What optimization strategy would you recommend for a memory-bound sparse matrix operation? <br>
4.| Compare architecture performance <br>  | Switch between Apple Silicon, Intel Xeon, and NVIDIA GPU configurations with the same application workload <br>  | Which architecture would provide better performance for a high operational intensity dense linear algebra workload? <br>
5.| Identify performance regions <br>  | Plot various applications and categorize them as memory-bound, compute-bound, or unattainable <br>  | An application plotting above the roofline indicates what performance characteristic? <br>

<div align="right">
    <b><a href="#top">↥ back to top</a></b>
</div>
<br/>
<hr>

<a name="SI"></a>

#### 5. Simulator Interactions:
<br>

Sr.No | What Students will do? |	What Simulator will do?	| Purpose of the task
:--|:--|:--|:--:
1.| Select architecture from dropdown menu (Apple Silicon, Intel Xeon, NVIDIA GPU, Custom) <br> | Display pre-configured roofline with appropriate memory bandwidth and compute capability parameters <br> | Understand how different architectures have distinct performance characteristics  
2.| Adjust memory bandwidth and compute capability sliders in custom mode <br> | Dynamically update the roofline chart showing new bandwidth line, compute ceiling, and ridge point <br> | Learn the relationship between hardware parameters and performance bounds
3.| Click on chart to plot application points or select from predefined workloads <br> | Add application points to the chart and provide analysis of whether the application is memory-bound, compute-bound, or unattainable <br> | Practice identifying performance bottlenecks and optimization opportunities  
4.| Explore different operational intensity ranges by plotting multiple applications <br> | Display real-time analysis panel with optimization suggestions specific to each application's characteristics <br> | Develop intuition for performance optimization strategies
5.| Switch between different architectures while keeping the same application points <br> | Maintain application positions while updating the underlying roofline to show comparative performance <br> | Understand how the same workload performs differently across architectures
