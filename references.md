## References

### Books and Textbooks

1. **Hennessy, J. L., & Patterson, D. A.** (2019). *Computer Architecture: A Quantitative Approach* (6th ed.). Morgan Kaufmann.
   - Chapter 4: Data-Level Parallelism in Vector, SIMD, and GPU Architectures
   - Appendix B: Review of Memory Hierarchy

2. **Williams, S., Waterman, A., & Patterson, D.** (2009). Roofline: an insightful visual performance model for multicore architectures. *Communications of the ACM*, 52(4), 65-76.

3. **Asanovic, K., Bodik, R., Catanzaro, B. C., Gebis, J. J., Husbands, P., Keutzer, K., ... & Yelick, K. A.** (2006). *The landscape of parallel computing research: A view from Berkeley* (Vol. 2). Technical Report UCB/EECS-2006-183, UC Berkeley.

### Research Papers

4. **Ilic, A., Pratas, F., & Sousa, L.** (2014). Cache-aware roofline model: Upgrading the loft. *IEEE Computer Architecture Letters*, 13(1), 21-24.

5. **Doerfler, D., Deslippe, J., Williams, S., Oliker, L., Cook, B., Kurth, T., ... & Yang, C.** (2016). Applying the roofline performance model to the Intel Xeon Phi Knights Landing processor. In *International Conference on High Performance Computing* (pp. 194-208). Springer.

6. **Yang, C., Kurth, T., & Williams, S.** (2018). Hierarchical roofline analysis for GPUs: Accelerating performance optimization for the NERSC-9 Perlmutter system. *Concurrency and Computation: Practice and Experience*, 32(20), e4547.

7. **Ofenbeck, G., Steinmann, R., Caparros, V., Spampinato, D. G., & Püschel, M.** (2014). Applying the roofline model. In *2014 IEEE International Symposium on Performance Analysis of Systems and Software (ISPASS)* (pp. 76-85). IEEE.

### Online Resources

8. **Intel Corporation.** (2021). *Intel Advisor Roofline Analysis*. Available at: https://www.intel.com/content/www/us/en/develop/documentation/advisor-user-guide/

9. **NVIDIA Corporation.** (2020). *NVIDIA Nsight Compute Roofline Charts*. Available at: https://docs.nvidia.com/nsight-compute/

10. **[Berkeley Roofline Toolkit](https://bitbucket.org/berkeleylab/roofline/src/default/)** (2023). Open-source implementation of roofline analysis tools.

11. **[Empirical Roofline Tool (ERT)](https://github.com/LLNL/Empirical-Roofline-Tool)** (2023). Lawrence Livermore National Laboratory roofline measurement tool.

### Academic Courses and Lectures

12. **UC Berkeley CS267: Applications of Parallel Computers.** Roofline Performance Model Lectures. Available at: https://sites.google.com/lbl.gov/cs267-spr2021

13. **MIT 6.172: Performance Engineering of Software Systems.** Performance Analysis and Optimization. Available at: https://ocw.mit.edu/courses/6-172-performance-engineering-of-software-systems-fall-2018/

14. **Stanford CS149: Parallel Computing.** Performance Analysis and Roofline Model. Available at: http://cs149.stanford.edu/

### Technical Standards and Specifications

15. **Intel Corporation.** (2021). *Intel 64 and IA-32 Architectures Optimization Reference Manual*. Order Number: 248966-046.

16. **AMD Corporation.** (2021). *AMD64 Architecture Programmer's Manual*. Publication No. 24593.

17. **ARM Limited.** (2021). *ARM Neon Programmer's Guide*. ARM DEN0018A.

18. **NVIDIA Corporation.** (2021). *CUDA C++ Programming Guide*. Version 11.4.

### Performance Analysis Tools

19. **Browne, S., Dongarra, J., Garner, N., Ho, G., & Mucci, P.** (2000). A portable programming interface for performance evaluation on modern processors. *The International Journal of High Performance Computing Applications*, 14(3), 189-204.

20. **Terpstra, D., Jagode, H., You, H., & Dongarra, J.** (2010). Collecting performance data with PAPI-C. In *Tools for High Performance Computing 2009* (pp. 157-173). Springer.

21. **Adhianto, L., Banerjee, S., Fagan, M., Krentel, M., Marin, G., Mellor-Crummey, J., & Tallent, N. R.** (2010). HPCToolkit: Tools for performance analysis of optimized parallel programs. *Concurrency and Computation: Practice and Experience*, 22(6), 685-701.

### Benchmarks and Applications

22. **McCalpin, J. D.** (1995). Memory bandwidth and machine balance in current high performance computers. *IEEE Computer Society Technical Committee on Computer Architecture (TCCA) Newsletter*, 2, 19-25.

23. **Dongarra, J. J., Luszczek, P., & Petitet, A.** (2003). The LINPACK benchmark: past, present and future. *Concurrency and Computation: Practice and Experience*, 15(9), 803-820.

24. **Bailey, D. H., Barszcz, E., Barton, J. T., Browning, D. S., Carter, R. L., Dagum, L., ... & Weeratunga, S.** (1991). The NAS parallel benchmarks. *The International Journal of Supercomputing Applications*, 5(3), 63-73.

### High-Performance Computing Systems

25. **Top500.org.** (2023). *The Top500 List*. Available at: https://www.top500.org/

26. **Green500.org.** (2023). *The Green500 List*. Available at: https://www.top500.org/green500/

27. **Kogge, P., & Stone, H. S.** (1973). A parallel algorithm for the efficient solution of a general class of recurrence equations. *IEEE Transactions on Computers*, 100(8), 786-793.

### Memory Systems and Architecture

28. **Jacob, B., Ng, S., & Wang, D.** (2007). *Memory Systems: Cache, DRAM, Disk*. Morgan Kaufmann.

29. **Henning, J. L.** (2006). SPEC CPU2006 benchmark descriptions. *ACM SIGARCH Computer Architecture News*, 34(4), 1-17.

30. **Koomey, J., Berard, S., Sanchez, M., & Wong, H.** (2011). Implications of historical trends in the electrical efficiency of computing. *IEEE Annals of the History of Computing*, 33(3), 46-54.

### Machine Learning and AI Workloads

31. **Jouppi, N. P., Young, C., Patil, N., Patterson, D., Agrawal, G., Bajwa, R., ... & Yoon, D. H.** (2017). In-datacenter performance analysis of a tensor processing unit. *ACM SIGARCH Computer Architecture News*, 45(2), 1-12.

32. **Chen, Y. H., Krishna, T., Emer, J. S., & Sze, V.** (2017). Eyeriss: An energy-efficient reconfigurable accelerator for deep convolutional neural networks. *IEEE Journal of Solid-State Circuits*, 52(1), 127-138.

33. **Sze, V., Chen, Y. H., Yang, T. J., & Emer, J. S.** (2017). Efficient processing of deep neural networks: A tutorial and survey. *Proceedings of the IEEE*, 105(12), 2295-2329.

### Additional Reading

34. **Williams, S.** (2008). *Auto-tuning performance on multicore computers* (Doctoral dissertation, University of California, Berkeley).

35. **Datta, K., Murphy, M., Volkov, V., Williams, S., Carter, J., Oliker, L., ... & Yelick, K.** (2008). Stencil computation optimization and auto-tuning on state-of-the-art multicore architectures. In *SC'08: Proceedings of the 2008 ACM/IEEE conference on Supercomputing* (pp. 1-12). IEEE.